import { useState } from 'react'

interface Props {
  code: string
  blurred?: boolean
}

const BASE_URL = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.host}`
  : 'https://jobhunter.bolt.host' //TODO: Change this to the actual website URL

export default function ReferralCodeDisplay({ code, blurred = false }: Props) {
  const [codeCopied, setCodeCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const shareLink = `${BASE_URL}/?ref=${code}`

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const shareTwitter = () => {
    const text = encodeURIComponent(`I've been using JobHunter to supercharge my job search — join me and get 20% off! 🚀`)
    const url = encodeURIComponent(shareLink)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer')
  }

  const shareLinkedIn = () => {
    const url = encodeURIComponent(shareLink)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="ref-code-display">
      {/* Code box */}
      <div className={`ref-code-box${blurred ? ' blurred' : ''}`} aria-label="Your referral code">
        <span className="ref-code-value">{code}</span>
        <button
          className="ref-copy-btn"
          onClick={copyCode}
          disabled={blurred}
          aria-label="Copy referral code"
          id="copy-referral-code-btn"
        >
          {codeCopied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span>{codeCopied ? 'Copied!' : 'Copy code'}</span>
        </button>
      </div>

      {blurred && (
        <p className="ref-blur-hint">Enter your email to reveal your referral code</p>
      )}

      {/* Shareable link */}
      {!blurred && (
        <div className="ref-link-row">
          <div className="ref-link-box">
            <span className="ref-link-text">{shareLink}</span>
          </div>
          <button
            className="ref-copy-link-btn"
            onClick={copyLink}
            id="copy-referral-link-btn"
            aria-label="Copy shareable link"
          >
            {linkCopied ? '✓ Copied!' : 'Copy link'}
          </button>
        </div>
      )}

      {/* Social share */}
      {!blurred && (
        <div className="ref-share-row">
          <span className="ref-share-label">Share on:</span>
          <button className="ref-social-btn ref-twitter" onClick={shareTwitter} id="share-twitter-btn" aria-label="Share on Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter / X
          </button>
          <button className="ref-social-btn ref-linkedin" onClick={shareLinkedIn} id="share-linkedin-btn" aria-label="Share on LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </button>
        </div>
      )}
    </div>
  )
}
