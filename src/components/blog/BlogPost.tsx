import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import BlogMarkdown from './BlogMarkdown'
import BlogTOC from './BlogTOC'
import BlogReactions from './BlogReactions'
import SEOHead, { type BreadcrumbItem } from './SEOHead'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface FullPostType {
  id: string
  slug: string
  title: string
  subtitle: string | null
  excerpt: string | null
  content: string
  cover_image_url: string | null
  author_name: string
  published_at: string
  read_time_mins: number
  blog_categories?: {
    name: string
    slug: string
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<FullPostType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return
      setLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id, slug, title, subtitle, excerpt, content, cover_image_url, author_name, published_at, read_time_mins,
          blog_categories ( name, slug )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

      if (error) {
        console.error('Error fetching post:', error)
      } else {
        setPost(data as unknown as FullPostType)
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return <div className="blog-post-loading page-container">Loading...</div>
  }

  if (!post) {
    return (
      <div className="blog-post-not-found page-container">
        <h1>Post not found</h1>
        <p>The post you are looking for doesn't exist or hasn't been published yet.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    )
  }

  const dateStr = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Draft'

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://myjobhunter.in'
  const canonicalUrl = post.blog_categories?.slug
    ? `${siteUrl}/blog/${post.blog_categories.slug}/${post.slug}`
    : `${siteUrl}/blog/${post.slug}`

  const metaDescription = post.excerpt ||
    post.subtitle ||
    `${post.title} — read on the JobHunter Blog.`

  // Build breadcrumbs: Home > Blog > [Category >] Post title
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    ...(post.blog_categories
      ? [{ name: post.blog_categories.name, url: `${siteUrl}/blog/${post.blog_categories.slug}` }]
      : []),
    { name: post.title, url: canonicalUrl },
  ]

  return (
    <>
      <SEOHead
        title={post.title}
        description={metaDescription}
        url={canonicalUrl}
        image={post.cover_image_url}
        publishedAt={post.published_at}
        authorName={post.author_name}
        category={post.blog_categories?.name}
        breadcrumbs={breadcrumbs}
      />

      <article className="blog-post" itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={metaDescription} />
        {post.cover_image_url && <meta itemProp="image" content={post.cover_image_url} />}
        {post.published_at && <meta itemProp="datePublished" content={post.published_at} />}
        {post.published_at && <meta itemProp="dateModified" content={post.published_at} />}

        <header className="blog-post-header">
          <div className="blog-post-header-inner page-container">
            {/* Breadcrumb navigation */}
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <ol className="blog-breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="blog-breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" className="blog-breadcrumb-link" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="blog-breadcrumb-sep" aria-hidden="true">/</li>
                <li className="blog-breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/blog" className="blog-breadcrumb-link" itemProp="item">
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                {post.blog_categories && (
                  <>
                    <li className="blog-breadcrumb-sep" aria-hidden="true">/</li>
                    <li className="blog-breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                      <Link
                        to={`/blog/${post.blog_categories.slug}`}
                        className="blog-breadcrumb-link"
                        itemProp="item"
                      >
                        <span itemProp="name">{post.blog_categories.name}</span>
                      </Link>
                      <meta itemProp="position" content="3" />
                    </li>
                  </>
                )}
                <li className="blog-breadcrumb-sep" aria-hidden="true">/</li>
                <li
                  className="blog-breadcrumb-item blog-breadcrumb-current"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  aria-current="page"
                >
                  <span itemProp="name">{post.title}</span>
                  <meta itemProp="position" content={post.blog_categories ? '4' : '3'} />
                </li>
              </ol>
            </nav>

            {post.blog_categories && (
              <Link
                to={`/blog/${post.blog_categories.slug}`}
                className="blog-post-category"
              >
                {post.blog_categories.name}
              </Link>
            )}

            {/* Single H1 per page — the post title */}
            <h1 className="blog-post-title" itemProp="name">{post.title}</h1>
            {post.subtitle && <p className="blog-post-subtitle">{post.subtitle}</p>}

            <div className="blog-post-meta">
              <span className="author" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">{post.author_name}</span>
              </span>
              <span className="dot">•</span>
              <time className="date" dateTime={post.published_at} itemProp="datePublished">{dateStr}</time>
              <span className="dot">•</span>
              <span className="read-time">{post.read_time_mins} min read</span>
            </div>
          </div>

          {post.cover_image_url && (
            <div className="blog-post-cover">
              <img src={post.cover_image_url} alt={post.title} itemProp="image" />
            </div>
          )}
        </header>

        <div className="blog-post-body page-container" itemProp="articleBody">
          <div className="blog-post-sidebar">
            <BlogTOC content={post.content} />
          </div>

          <div className="blog-post-content">
            <BlogMarkdown content={post.content} />

            <div className="blog-post-footer">
              <BlogReactions postId={post.id} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
