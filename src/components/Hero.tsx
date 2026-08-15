import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────
   The Queue — signature product moment.
   One application moves through the pipeline, then the demo
   soft-loops. Reduced-motion freezes on a resolved still.
   ───────────────────────────────────────────────────────────── */

type Stage =
  | 'load' | 'populate' | 'open' | 'scan' | 'tailor' | 'ready'
  | 'approving' | 'approved' | 'sent' | 'advance' | 'rest'

const JOBS = [
  { role: 'Frontend Engineer', company: 'ACME · REMOTE', id: 'fe' },
  { role: 'QA Analyst', company: 'ZETA · BANGALORE', id: 'qa' },
  { role: 'Backend Developer', company: 'NIMBUS · PUNE', id: 'be' },
]

const HERO_PHRASES = [
  'Human-in-the-Loop.',
  'You Stay in Control.',
  'No Spam. Just Results.',
  'AI-Powered. Human-Approved.',
]

function useTypewriter(phrases: string[], typingMs = 55, erasingMs = 28, pauseMs = 2200) {
  const [text, setText] = useState(phrases[0])
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const charIdx = useRef(phrases[0].length)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    if (isTyping) {
      if (charIdx.current < phrase.length) {
        const t = setTimeout(() => {
          charIdx.current++
          setText(phrase.slice(0, charIdx.current))
        }, typingMs)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setIsTyping(false), pauseMs)
        return () => clearTimeout(t)
      }
    } else {
      if (charIdx.current > 0) {
        const t = setTimeout(() => {
          charIdx.current--
          setText(phrase.slice(0, charIdx.current))
        }, erasingMs)
        return () => clearTimeout(t)
      } else {
        const next = (phraseIdx + 1) % phrases.length
        charIdx.current = 0
        setPhraseIdx(next)
        setIsTyping(true)
      }
    }
  }, [text, isTyping, phraseIdx, phrases, typingMs, erasingMs, pauseMs])

  return text
}

/** Readable cinematic beats (ms from cycle start). */
const TIMELINE: [number, Stage][] = [
  [0, 'load'],
  [600, 'populate'],
  [1200, 'open'],
  [1700, 'scan'],
  [2300, 'tailor'],
  [3400, 'ready'],
  [4000, 'approving'],
  [4600, 'approved'],
  [5300, 'sent'],
  [6000, 'advance'],
  [6800, 'rest'],
]

const REST_HOLD_MS = 3000

const CHIP: Record<Stage, string> = {
  load: 'DRAFTED', populate: 'DRAFTED', open: 'DRAFTED',
  scan: 'TAILORING', tailor: 'TAILORING', ready: 'READY',
  approving: 'READY', approved: 'APPROVED', sent: 'SENT',
  advance: 'NEXT', rest: 'NEXT',
}

const STATUS: Record<Stage, string> = {
  load: 'Booting queue…',
  populate: '3 drafts loaded',
  open: 'Opening resume',
  scan: 'Matching to role…',
  tailor: 'Reordering lines',
  ready: 'Awaiting approval',
  approving: 'Confirming send',
  approved: 'Approved',
  sent: 'Delivering…',
  advance: 'Queue advanced',
  rest: '1 delivered · next ready',
}

const PIPE_STEPS = ['Draft', 'Tailor', 'Approve', 'Send'] as const

function pipeIndex(stage: Stage): number {
  if (['load', 'populate', 'open'].includes(stage)) return 0
  if (['scan', 'tailor'].includes(stage)) return 1
  if (['ready', 'approving', 'approved'].includes(stage)) return 2
  return 3
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function ApprovalQueue() {
  const reduced = prefersReducedMotion()
  const [stage, setStage] = useState<Stage>(reduced ? 'rest' : 'load')
  const [cycle, setCycle] = useState(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (reduced) return

    const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
    clear()

    timers.current = TIMELINE.map(([ms, s]) =>
      window.setTimeout(() => setStage(s), ms)
    )

    timers.current.push(
      window.setTimeout(() => {
        setCycle((c) => c + 1)
        setStage('load')
      }, TIMELINE[TIMELINE.length - 1][0] + REST_HOLD_MS)
    )

    return clear
  }, [reduced, cycle])

  const advanced = stage === 'advance' || stage === 'rest'
  const active = advanced ? JOBS[1] : JOBS[0]
  const queued = advanced ? [JOBS[2]] : [JOBS[1], JOBS[2]]
  const resumeOpen = ['open', 'scan', 'tailor', 'ready', 'approving', 'approved', 'sent'].includes(stage)
  const tailored = ['tailor', 'ready', 'approving', 'approved', 'sent'].includes(stage)
  const scanning = stage === 'scan' || stage === 'tailor'
  const showSentJob = ['sent', 'advance', 'rest'].includes(stage)
  const step = reduced ? 3 : pipeIndex(stage)
  const pipeComplete = reduced || stage === 'rest' || stage === 'advance'
  const live = !reduced && !['rest', 'load'].includes(stage)
  const focusApprove = ['ready', 'approving', 'approved'].includes(stage)

  const cls = [
    'hq',
    stage !== 'load' ? 'is-populated' : '',
    resumeOpen ? 'has-resume' : '',
    tailored ? 'is-tailored' : '',
    scanning ? 'is-scanning' : '',
    stage === 'ready' ? 'is-ready' : '',
    stage === 'approving' ? 'is-approving' : '',
    stage === 'approved' ? 'is-approved' : '',
    stage === 'sent' ? 'is-sent' : '',
    advanced ? 'is-advanced' : '',
    stage === 'rest' ? 'is-rest' : '',
    showSentJob ? 'has-sent' : '',
    focusApprove ? 'is-focus-approve' : '',
    pipeComplete ? 'is-pipe-complete' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      role="img"
      aria-label="JobHunter approval queue: a Frontend Engineer application is tailored from existing resume lines, approved by the user, and sent."
    >
      <div className="hq-chrome">
        <div className="hq-chrome-left">
          <span className={`hq-live${live ? ' on' : ''}`} aria-hidden="true" />
          <span className="hq-chrome-title">Approval Queue</span>
          <span className="hq-chrome-sep" aria-hidden="true" />
          <span className="hq-chrome-meta">Phase 1</span>
        </div>
        <span className="hq-status" data-stage={stage}>{STATUS[stage]}</span>
        <span className="hq-head-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>

      <div className="hq-pipe" aria-hidden="true">
        <div className="hq-pipe-track">
          <div className="hq-pipe-fill" style={{ '--step': step } as CSSProperties} />
        </div>
        {PIPE_STEPS.map((label, i) => (
          <div
            key={label}
            className={[
              'hq-pipe-step',
              i < step || pipeComplete ? 'done' : '',
              i === step && !pipeComplete ? 'current' : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="hq-pipe-dot">
              {(i < step || pipeComplete) && (
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.2l2.4 2.4 4.6-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </span>
            <span className="hq-pipe-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="hq-body">
        <div className={`hq-active${stage === 'advance' ? ' is-entering' : ''}`} key={`${cycle}-${advanced ? 'b' : 'a'}`}>
          <div className="hq-active-head">
            <div>
              <div className="hq-role">{active.role}</div>
              <div className="hq-company">{active.company}</div>
            </div>
            <span className="hq-chip" data-state={CHIP[stage]}>{CHIP[stage]}</span>
          </div>

          <div className={`hq-resume${resumeOpen ? ' open' : ''}`}>
            <div className="hq-resume-doc">
              <div className="hq-resume-label">
                <span>resume</span>
                <span className="hq-resume-hint">existing lines only</span>
              </div>
              <div className="hq-lines">
                <div className="hq-line"><span className="dot" />React · TypeScript · testing</div>
                <div className="hq-line mark" data-slot="a"><span className="dot" />Led 0→1 analytics dashboard</div>
                <div className="hq-line" data-slot="b"><span className="dot" />Cut build time by 40%</div>
                <div className={`hq-scan${scanning ? ' on' : ''}`} aria-hidden="true" />
              </div>
              <div className="hq-tailor-note">
                <span className="hq-tailor-mark" aria-hidden="true" />
                <span><b>Reordered</b> to match the role — nothing invented.</span>
              </div>
            </div>
          </div>

          <div className="hq-approve">
            <button className="hq-approve-btn" tabIndex={-1} aria-hidden="true">
              <svg className="hq-ring" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="7" />
                <path d="M6.5 10.2l2.3 2.3 4.7-4.9" />
              </svg>
              Approve &amp; send
            </button>
            <svg className="hq-pointer" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M5 3l14 8-6 1.5L10 20 5 3z" />
            </svg>
          </div>

          {advanced && (
            <div className="hq-next-hint">
              Waiting in queue — open when ready
            </div>
          )}
        </div>

        <div className="hq-tray-label"><span />Queued<span /></div>
        <div className="hq-queue">
          {queued.map((j, i) => (
            <div className="hq-q" key={j.id} style={{ '--i': i } as CSSProperties}>
              <div>
                <div className="hq-q-role">{j.role}</div>
                <div className="hq-company">{j.company}</div>
              </div>
              <span className="hq-chip" data-state="DRAFTED">DRAFTED</span>
            </div>
          ))}
        </div>

        <div className="hq-tray-label"><span />Sent<span /></div>
        <div className={`hq-sent${showSentJob ? ' filled' : ''}`}>
          {showSentJob ? (
            <div className="hq-sent-job">
              <div>
                <div className="hq-q-role">{JOBS[0].role}</div>
                <div className="hq-company">{JOBS[0].company}</div>
              </div>
              <span className="hq-sent-tick" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
              </span>
            </div>
          ) : (
            <div className="hq-sent-empty">
              <span className="hq-sent-label">Nothing sent yet</span>
              <span className="hq-sent-count">0</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TypewriterHeading() {
  const phrase = useTypewriter(HERO_PHRASES)
  return (
    <>
      Apply Smarter, Land Faster<br />
      <em>
        {phrase}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.85em',
            background: 'currentColor',
            marginLeft: '3px',
            verticalAlign: 'middle',
            animation: 'hero-cursor-blink 0.8s step-end infinite',
          }}
        />
      </em>
    </>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge hero-enter" style={{ '--d': '0ms' } as CSSProperties}>
            <span className="hero-badge-dot" aria-hidden="true" />
            Phase 1 — Building the Foundation
          </div>

          <h1 id="hero-heading" className="hero-enter" style={{ '--d': '90ms' } as CSSProperties}>
            <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>JobHunter — Human-in-the-loop AI Job Search Companion</span>
            <TypewriterHeading />
          </h1>

          <p className="hero-sub hero-enter" style={{ '--d': '180ms' } as CSSProperties}>
            JobHunter scrapes real openings, tailors your resume to each one, and holds
            every application behind your approval before it&apos;s sent.
          </p>

          <div className="hero-form-wrap hero-enter" style={{ '--d': '270ms' } as CSSProperties}>
            <a
              id="hero-login-btn"
              href="https://app.myjobhunter.in"
              className="btn btn-ink"
              style={{ padding: '16px 80px', fontSize: '1.2rem', borderRadius: '100px', minWidth: '280px', textAlign: 'center' }}
            >
              <span><strong>Start Hunting Jobs</strong></span>
            </a>
          </div>

          <div className="hero-links hero-enter" style={{ '--d': '360ms' } as CSSProperties}>
            <Link className="hero-textlink" to="/how-it-works">
              See how it works
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <a className="hero-textlink" href="/features">
              Explore features
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
          </div>

          <div className="hero-stats hero-enter" style={{ '--d': '450ms' } as CSSProperties} role="list" aria-label="What the engine guarantees">
            {[
              { num: '6', label: 'Live job sources' },
              { num: '0', label: 'Fabricated resume lines' },
              { num: '100%', label: 'User-approved sends' },
            ].map(({ num, label }) => (
              <div key={label} role="listitem">
                <div className="hero-stat-num">{num}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-stage hero-enter" style={{ '--d': '160ms' } as CSSProperties}>
          <div className="hero-stage-plane" aria-hidden="true" />
          <div className="hero-stage-frame" aria-hidden="true" />
          <ApprovalQueue />
        </div>
      </div>
    </section>
  )
}
