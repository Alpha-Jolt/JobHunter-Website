import { useEffect, useState, useMemo } from 'react'

interface BlogTOCProps {
  content: string
}

export default function BlogTOC({ content }: BlogTOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  const headings = useMemo(() => {
    // Extract headings from markdown content
    const headingLines = content.split('\n').filter(line => line.startsWith('## ') || line.startsWith('### '))

    return headingLines.map(line => {
      const level = line.startsWith('### ') ? 3 : 2
      const text = line.replace(/^#+\s/, '').trim()
      // Generate ID matching how marked generates IDs (lowercase, replace spaces with hyphens, remove special chars)
      const id = text.toLowerCase().replace(/[^\w]+/g, '-')
      return { id, text, level }
    })
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]

      let currentActiveId = ''
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect()
        // If the heading is above the middle of the viewport
        if (rect.top <= window.innerHeight / 2) {
          currentActiveId = el.id
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId)
      } else if (headingElements.length > 0) {
        setActiveId(headingElements[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="blog-toc">
      <h4 className="blog-toc-title">Table of Contents</h4>
      <ul>
        {headings.map(h => (
          <li key={h.id} className={`toc-level-${h.level}`}>
            <a
              href={`#${h.id}`}
              className={activeId === h.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(h.id)
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 100, // Account for fixed header if any
                    behavior: 'smooth'
                  })
                }
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
