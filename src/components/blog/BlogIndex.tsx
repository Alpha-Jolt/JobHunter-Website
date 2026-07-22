import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import BlogCard, { type BlogPostType } from './BlogCard'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [availableCategories, setAvailableCategories] = useState<{name: string, slug: string}[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')

  // Fetch categories once on mount
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('name, slug')
        .order('name', { ascending: true })
      
      if (!error && data) {
        setAvailableCategories(data)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      let query = supabase
        .from('blog_posts')
        .select(`
          id, slug, title, excerpt, cover_image_url, author_name, published_at, read_time_mins,
          blog_categories ( name, slug )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (category !== 'all') {
        // Find category id first, or use an inner join. 
        // For simplicity, we filter on client side if there are few posts, 
        // or we do it properly via foreign table filter.
        query = query.eq('blog_categories.slug', category)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching posts', error)
      } else {
        // Supabase foreign table filtering might return null for nested objects if they don't match,
        // so we filter out rows where blog_categories is null (if filtering by category)
        let filteredData = data as unknown as BlogPostType[]
        if (category !== 'all') {
          filteredData = filteredData.filter(p => p.blog_categories)
        }
        setPosts(filteredData || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [category])

  return (
    <div className="blog-index page-container">
      <header className="blog-header">
        <h1>The JobHunter Blog</h1>
        <p className="subtitle">Insights on job search automation, career growth, and building in public.</p>

        <div className="blog-tabs">
          <button
            className={`blog-tab ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All Posts
          </button>
          {availableCategories.map(cat => (
            <button
              key={cat.slug}
              className={`blog-tab ${category === cat.slug ? 'active' : ''}`}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="blog-loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="blog-empty">No posts found in this category.</div>
      ) : (
        <div className="blog-grid">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
