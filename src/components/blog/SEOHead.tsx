import { useEffect } from 'react'

interface SEOHeadProps {
  title: string
  description: string
  url: string
  image?: string | null
  publishedAt?: string
  authorName?: string
  category?: string
}

export default function SEOHead({
  title,
  description,
  url,
  image,
  publishedAt,
  authorName,
  category,
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} — JobHunter Blog`

    // Title
    document.title = fullTitle

    // Helper to set/create a meta tag
    const setMeta = (selector: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        const [attr, val] = selector.replace('[', '').replace(']', '').split('=')
        el.setAttribute(attr.trim(), val.replace(/"/g, '').trim())
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Core
    setMeta('meta[name="description"]', description)
    setLink('canonical', url)

    // Open Graph
    setMeta('meta[property="og:type"]', 'article')
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', description)
    if (image) setMeta('meta[property="og:image"]', image)

    // Twitter / X
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:url"]', url)
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', description)
    if (image) setMeta('meta[name="twitter:image"]', image)

    // JSON-LD Article structured data (AEO / GEO)
    const existingLd = document.getElementById('blog-post-jsonld')
    if (existingLd) existingLd.remove()

    const jsonld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url,
      ...(image && { image }),
      ...(publishedAt && { datePublished: publishedAt }),
      ...(publishedAt && { dateModified: publishedAt }),
      author: {
        '@type': 'Person',
        name: authorName || 'JobHunter',
      },
      publisher: {
        '@type': 'Organization',
        name: 'JobHunter',
        url: import.meta.env.VITE_SITE_URL || 'https://myjobhunter.in',
        logo: {
          '@type': 'ImageObject',
          url: `${import.meta.env.VITE_SITE_URL || 'https://myjobhunter.in'}/logo.png`,
        },
      },
      ...(category && {
        articleSection: category,
      }),
      inLanguage: 'en-IN',
      isAccessibleForFree: true,
    }

    const script = document.createElement('script')
    script.id = 'blog-post-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonld)
    document.head.appendChild(script)

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = 'JobHunter — Land your Next Job on Autopilot'
      setMeta('meta[name="description"]', 'JobHunter scrapes real openings, tailors your resume to each one, and holds every application behind your approval. Human-in-the-loop, no fabrication. Building in public — Phase 1.')
      setMeta('meta[property="og:type"]', 'website')
      setMeta('meta[property="og:url"]', import.meta.env.VITE_SITE_URL || 'https://myjobhunter.in/')
      setMeta('meta[property="og:title"]', 'JobHunter — Land your Next Job on Autopilot')
      setMeta('meta[property="og:description"]', 'JobHunter scrapes real openings, tailors your resume to each one, and holds every application behind your approval. Human-in-the-loop, no fabrication.')
      setLink('canonical', import.meta.env.VITE_SITE_URL || 'https://myjobhunter.in/')
      document.getElementById('blog-post-jsonld')?.remove()
    }
  }, [title, description, url, image, publishedAt, authorName, category])

  return null
}
