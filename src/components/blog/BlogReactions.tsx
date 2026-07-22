import { useState } from 'react'

interface BlogReactionsProps {
  postId: string
}

const EMOJIS = ['👍', '❤️', '🔥', '🤯', '🙌']
const FINGERPRINT_KEY = 'jh_blog_fingerprint'

// Simple browser fingerprint for rate-limiting
function getFingerprint(): string {
  let fp = localStorage.getItem(FINGERPRINT_KEY)
  if (!fp) {
    fp = Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem(FINGERPRINT_KEY, fp)
  }
  return fp
}

export default function BlogReactions({ postId }: BlogReactionsProps) {
  const [counts, setCounts] = useState<Record<string, number>>({
    '👍': 0, '❤️': 0, '🔥': 0, '🤯': 0, '🙌': 0
  })
  const [userReaction, setUserReaction] = useState<string | null>(() => {
    const local = localStorage.getItem(`jh_reaction_single_${postId}`)
    if (local && EMOJIS.includes(local)) {
      return local
    }
    // Migration from old Set logic
    const oldLocal = localStorage.getItem(`jh_reactions_${postId}`)
    if (oldLocal) {
      try {
        const parsed = JSON.parse(oldLocal)
        if (Array.isArray(parsed) && parsed.length > 0) {
          localStorage.setItem(`jh_reaction_single_${postId}`, parsed[0])
          return parsed[0]
        }
      } catch { /* ignore */ }
    }
    return null
  })
  const [loading, setLoading] = useState(false)

  const handleReaction = async (emoji: string) => {
    if (loading) return
    setLoading(true)

    // Optimistic UI update
    const previousReaction = userReaction
    const isSame = previousReaction === emoji
    const newReaction = isSame ? null : emoji

    setUserReaction(newReaction)
    setCounts(prev => {
      const next = { ...prev }
      if (previousReaction) {
        next[previousReaction] = Math.max(0, (next[previousReaction] || 0) - 1)
      }
      if (newReaction) {
        next[newReaction] = (next[newReaction] || 0) + 1
      }
      return next
    })

    // Save locally
    if (newReaction) {
      localStorage.setItem(`jh_reaction_single_${postId}`, newReaction)
    } else {
      localStorage.removeItem(`jh_reaction_single_${postId}`)
    }

    // Send to edge function
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          post_id: postId,
          emoji,
          fingerprint: getFingerprint()
        }),
      })

      const data = await res.json()
      if (res.ok && data.counts) {
        setCounts(data.counts)
      } else {
        console.error('Failed to register reaction:', data.error)
      }
    } catch (err) {
      console.error('Network error saving reaction:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="blog-reactions">
      <h4 className="blog-reactions-title">What did you think?</h4>
      <div className="blog-reactions-list">
        {EMOJIS.map(emoji => {
          const count = Math.max(0, counts[emoji] || 0)
          const active = userReaction === emoji
          return (
            <button
              key={emoji}
              className={`blog-reaction-btn ${active ? 'active' : ''}`}
              onClick={() => handleReaction(emoji)}
              disabled={loading}
              aria-label={`React with ${emoji}`}
            >
              <span className="emoji">{emoji}</span>
              <span className="count">{count > 0 ? count : ''}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
