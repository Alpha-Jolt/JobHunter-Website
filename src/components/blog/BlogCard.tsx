import { Link } from 'react-router-dom'

export interface BlogPostType {
  id: string
  slug: string
  title: string
  excerpt: string
  cover_image_url: string
  author_name: string
  published_at: string
  read_time_mins: number
  blog_categories?: {
    name: string
    slug: string
  }
}

interface BlogCardProps {
  post: BlogPostType
}

export default function BlogCard({ post }: BlogCardProps) {
  const dateStr = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Draft'

  return (
    <Link to={post.blog_categories?.slug ? `/blog/${post.blog_categories.slug}/${post.slug}` : `/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-image">
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt={post.title} loading="lazy" />
        ) : (
          <div className="blog-card-image-placeholder" />
        )}
        {post.blog_categories && (
          <span className="blog-card-category">{post.blog_categories.name}</span>
        )}
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span className="blog-card-author">{post.author_name}</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-date">{dateStr}</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-read">{post.read_time_mins} min read</span>
        </div>
      </div>
    </Link>
  )
}
