#!/usr/bin/env node
/**
 * scripts/ensure-rollup-native.js
 *
 * Permanent workaround for npm bug: https://github.com/npm/cli/issues/4828
 *
 * npm silently fails to install @rollup/rollup-win32-x64-msvc (optional dep)
 * when the package-lock.json was generated on a non-Windows machine (missing
 * "resolved" / "integrity" fields for the win32-x64 entry).
 *
 * Rollup's native.js checks for a LOCAL .node file in its own dist/ directory
 * BEFORE falling back to the @rollup scoped package. Placing the binary there
 * bypasses npm's optional dep resolution entirely.
 *
 * This script:
 *  1. Runs only on Windows x64 — no-ops on all other platforms.
 *  2. Checks if rollup.win32-x64-msvc.node already exists in rollup/dist/.
 *  3. If missing: npm-packs the exact version binary and extracts just the .node.
 *  4. Cleans up the temp tarball.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Only needed on Windows x64
if (process.platform !== 'win32' || process.arch !== 'x64') {
  process.exit(0)
}

const rootDir = path.join(__dirname, '..')
const rollupDistDir = path.join(rootDir, 'node_modules', 'rollup', 'dist')
const binaryDest = path.join(rollupDistDir, 'rollup.win32-x64-msvc.node')

// Already present — nothing to do
if (fs.existsSync(binaryDest)) {
  process.exit(0)
}

// Read the installed rollup version so we fetch the exact matching binary
let rollupVersion
try {
  rollupVersion = JSON.parse(
    fs.readFileSync(path.join(rollupDistDir, '..', 'package.json'), 'utf8')
  ).version
} catch {
  console.warn('[ensure-rollup-native] Could not read rollup version — skipping.')
  process.exit(0)
}

console.log(`[ensure-rollup-native] rollup.win32-x64-msvc.node missing — fetching v${rollupVersion}...`)

const tmpDir = path.join(rootDir, 'node_modules', '.rollup-native-tmp')
const tgzName = `rollup-rollup-win32-x64-msvc-${rollupVersion}.tgz`
const tgzPath = path.join(tmpDir, tgzName)

try {
  fs.mkdirSync(tmpDir, { recursive: true })

  // Download the tarball for the exact version
  execSync(
    `npm pack @rollup/rollup-win32-x64-msvc@${rollupVersion} --pack-destination "${tmpDir}"`,
    { stdio: 'pipe', cwd: rootDir }
  )

  // Extract only the .node binary directly into rollup/dist/
  execSync(
    `tar -xzf "${tgzPath}" -C "${rollupDistDir}" --strip-components=1 "package/rollup.win32-x64-msvc.node"`,
    { stdio: 'pipe' }
  )

  fs.rmSync(tmpDir, { recursive: true, force: true })

  console.log('[ensure-rollup-native] ✓ Binary installed at node_modules/rollup/dist/rollup.win32-x64-msvc.node')
} catch (err) {
  // Never fail the install — just warn
  try { fs.rmSync(tmpDir, { recursive: true, force: true }) } catch {}
  console.warn(`[ensure-rollup-native] ⚠ Could not auto-install binary: ${err.message}`)
  console.warn('[ensure-rollup-native]   Manual fix: npm pack @rollup/rollup-win32-x64-msvc@' + rollupVersion)
  console.warn('[ensure-rollup-native]   Then: tar -xzf <tgz> -C node_modules/rollup/dist --strip-components=1 package/rollup.win32-x64-msvc.node')
}
