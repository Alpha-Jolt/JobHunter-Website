import { useMemo } from 'react'
import { marked, type Tokens } from 'marked'
import DOMPurify from 'dompurify'

interface BlogMarkdownProps {
  content: string
}

// Shift heading levels down by 1 so the page H1 (post title) is always the sole H1.
// Markdown # → <h2>, ## → <h3>, ### → <h4>, etc.
const shiftedRenderer = new marked.Renderer()
shiftedRenderer.heading = ({ text, depth }: Tokens.Heading) => {
  const level = Math.min(depth + 1, 6)
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `<h${level} id="${id}">${text}</h${level}>\n`
}

export default function BlogMarkdown({ content }: BlogMarkdownProps) {
  const html = useMemo(() => {
    const rawHtml = marked.parse(content, { renderer: shiftedRenderer })
    return DOMPurify.sanitize(rawHtml as string)
  }, [content])

  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

