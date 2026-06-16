import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const CACHE_TTL = 5 * 60 * 1000

const supabase = SUPABASE_URL && ANON_KEY
  ? createClient(SUPABASE_URL, ANON_KEY)
  : null

type VoteState = { up: number; down: number; userVote: 'up' | 'down' | null }
type CacheEntry = { data: Record<string, VoteState>; ts: number }

const CACHE_KEY = 'jh_feature_votes_cache'
const FP_KEY = 'jh_voter_fp'

function getFingerprint(): string {
  let fp = localStorage.getItem(FP_KEY)
  if (!fp) { fp = crypto.randomUUID(); localStorage.setItem(FP_KEY, fp) }
  return fp
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    return Date.now() - entry.ts > CACHE_TTL ? null : entry
  } catch { return null }
}

function writeCache(data: Record<string, VoteState>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
}

export function useFeatureVotes(featureIds: string[]) {
  const [votes, setVotes] = useState<Record<string, VoteState>>(() => readCache()?.data ?? {})
  const [loading, setLoading] = useState(() => !readCache())

  const featureKey = featureIds.join(',')

  useEffect(() => {
    if (!loading) return

    if (!supabase) {
      const fp = getFingerprint()
      const fpVotes: Record<string, 'up' | 'down'> = JSON.parse(
        localStorage.getItem(`jh_fp_votes_${fp}`) ?? '{}'
      )
      const map: Record<string, VoteState> = {}
      for (const id of featureIds) {
        map[id] = votes[id] ?? { up: 0, down: 0, userVote: fpVotes[id] ?? null }
      }
      setVotes(map)
      writeCache(map)
      setLoading(false)
      return
    }

    supabase
      .from('feature_votes')
      .select('feature_id, up_count, down_count')
      .in('feature_id', featureIds)
      .then(({ data }) => {
        const fp = getFingerprint()
        const fpVotes: Record<string, 'up' | 'down'> = JSON.parse(
          localStorage.getItem(`jh_fp_votes_${fp}`) ?? '{}'
        )
        const map: Record<string, VoteState> = {}
        for (const id of featureIds) {
          const row = data?.find((r) => r.feature_id === id)
          map[id] = { up: row?.up_count ?? 0, down: row?.down_count ?? 0, userVote: fpVotes[id] ?? null }
        }
        setVotes(map)
        writeCache(map)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureKey])

  const vote = useCallback(async (featureId: string, direction: 'up' | 'down') => {
    const fp = getFingerprint()

    setVotes((prev) => {
      const cur = prev[featureId] ?? { up: 0, down: 0, userVote: null }
      const isToggle = cur.userVote === direction
      const isSwitch = cur.userVote && cur.userVote !== direction
      const next: VoteState = {
        up: cur.up + (direction === 'up' ? (isToggle ? -1 : 1) : isSwitch ? -1 : 0),
        down: cur.down + (direction === 'down' ? (isToggle ? -1 : 1) : isSwitch ? -1 : 0),
        userVote: isToggle ? null : direction,
      }
      const updated = { ...prev, [featureId]: next }
      writeCache(updated)
      return updated
    })

    if (!SUPABASE_URL || !ANON_KEY) {
      const fpKey = `jh_fp_votes_${fp}`
      const fpVotes: Record<string, string | null> = JSON.parse(localStorage.getItem(fpKey) ?? '{}')
      const cur = votes[featureId] ?? { up: 0, down: 0, userVote: null }
      const isToggle = cur.userVote === direction
      const nextVote = isToggle ? null : direction
      if (nextVote) fpVotes[featureId] = nextVote
      else delete fpVotes[featureId]
      localStorage.setItem(fpKey, JSON.stringify(fpVotes))
      return
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/vote-feature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ANON_KEY}` },
        body: JSON.stringify({ feature_id: featureId, vote: direction, fingerprint: fp }),
      })
      const json = await res.json()
      if (res.ok) {
        const fpKey = `jh_fp_votes_${fp}`
        const fpVotes: Record<string, string | null> = JSON.parse(localStorage.getItem(fpKey) ?? '{}')
        if (json.user_vote) fpVotes[featureId] = json.user_vote
        else delete fpVotes[featureId]
        localStorage.setItem(fpKey, JSON.stringify(fpVotes))
        setVotes((prev) => {
          const updated = { ...prev, [featureId]: { up: json.up_count, down: json.down_count, userVote: json.user_vote } }
          writeCache(updated)
          return updated
        })
      }
    } catch { /* optimistic state remains */ }
  }, [])

  return { votes, loading, vote }
}
