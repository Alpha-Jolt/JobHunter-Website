import React, { useState, useEffect, useCallback } from 'react'
import { createClient, type Session } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

type Post     = Record<string, unknown>
type Category = { id: string; name: string; slug: string }
type Tab      = 'posts' | 'categories'

export default function BlogAdmin() {
  const [session, setSession]         = useState<Session | null>(null)
  const [isAdmin, setIsAdmin]         = useState<boolean | null>(null)
  const [activeTab, setActiveTab]     = useState<Tab>('posts')
  const [posts, setPosts]             = useState<Post[]>([])
  const [categories, setCategories]   = useState<Category[]>([])
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [saveError, setSaveError]     = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Editor controlled fields for auto-slug
  const [editorTitle, setEditorTitle]               = useState('')
  const [editorSlug, setEditorSlug]                 = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Category form
  const [showCatForm, setShowCatForm] = useState(false)
  const [catName, setCatName]         = useState('')
  const [catSlug, setCatSlug]         = useState('')
  const [catError, setCatError]       = useState<string | null>(null)

  // Login form
  const [loginEmail, setLoginEmail]       = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError]       = useState<string | null>(null)
  const [loginLoading, setLoginLoading]   = useState(false)

  // ── Auth ─────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      if (!s) setIsAdmin(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // ── Admin check ───────────────────────────────────────────────
  useEffect(() => {
    if (!session) return
    const check = async () => {
      const { data } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle()
      if (!data) {
        setIsAdmin(false)
        setTimeout(() => supabase.auth.signOut(), 2500)
      } else {
        setIsAdmin(true)
      }
    }
    check()
  }, [session])

  // ── Slug helper ──────────────────────────────────────────────
  const toSlug = (text: string) =>
    text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

  // ── Sync editor fields when editingPost changes ───────────────
  useEffect(() => {
    if (editingPost === null) return
    setEditorTitle(String(editingPost.title || ''))
    setEditorSlug(String(editingPost.slug || ''))
    // Only lock slug auto-fill for existing posts
    setSlugManuallyEdited(Boolean(editingPost.id))
  }, [editingPost])

  // ── Fetch data ────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    const [{ data: postsData }, { data: catsData }] = await Promise.all([
      supabase.from('blog_posts').select('*, blog_categories(name)').order('created_at', { ascending: false }),
      supabase.from('blog_categories').select('*').order('name', { ascending: true }),
    ])
    if (postsData) setPosts(postsData as Post[])
    if (catsData)  setCategories(catsData as Category[])
  }, [])

  useEffect(() => { if (isAdmin) fetchData() }, [isAdmin, fetchData])

  // ── Login ─────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoginLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    if (error) setLoginError(error.message)
    setLoginLoading(false)
  }

  // ── Save post ─────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveError(null)
    setSaveSuccess(false)
    const form = e.target as HTMLFormElement
    const fd   = new FormData(form)

    const postData = {
      title:           fd.get('title'),
      slug:            fd.get('slug'),
      subtitle:        fd.get('subtitle')        || null,
      excerpt:         fd.get('excerpt'),
      content:         fd.get('content'),
      cover_image_url: fd.get('cover_image_url') || null,
      author_name:     fd.get('author_name'),
      category_id:     (fd.get('category_id') as string) || null,
      status:          fd.get('status'),
      published_at:    fd.get('published_at')    || null,
    }

    const result = editingPost?.id
      ? await supabase.from('blog_posts').update(postData).eq('id', editingPost.id)
      : await supabase.from('blog_posts').insert([postData])

    if (result.error) {
      setSaveError(result.error.message)
    } else {
      setSaveSuccess(true)
      setEditingPost(null)
      fetchData()
    }
  }

  // ── Save category ─────────────────────────────────────────────
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setCatError(null)
    const { error } = await supabase.from('blog_categories').insert([{
      name: catName.trim(),
      slug: catSlug.trim().toLowerCase().replace(/\s+/g, '-'),
    }])
    if (error) {
      setCatError(error.message)
    } else {
      setCatName(''); setCatSlug(''); setShowCatForm(false); fetchData()
    }
  }

  const publishedCount = posts.filter(p => p.status === 'published').length
  const draftCount     = posts.filter(p => p.status === 'draft').length

  // ──────────────────────────────────────────────────────────────
  // RENDER: not logged in
  // ──────────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="blog-admin-login">
        <div className="blog-admin-login-card">
          <div className="blog-admin-login-logo">JobHunter Admin</div>
          <h1 className="blog-admin-login-h1">Sign in</h1>
          <p className="blog-admin-login-sub">Blog & content management</p>
          <form className="blog-admin-login-form" onSubmit={handleLogin}>
            <div className="blog-admin-field">
              <label className="blog-admin-label" htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>
            <div className="blog-admin-field">
              <label className="blog-admin-label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>
            {loginError && (
              <div className="blog-admin-form-feedback error">
                <span>⚠</span> {loginError}
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={loginLoading} style={{ marginTop: '4px' }}>
              {loginLoading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // RENDER: checking access
  if (isAdmin === null) {
    return (
      <div className="blog-admin-checking">
        <div className="blog-admin-checking-inner">
          <div className="blog-admin-checking-dot" />
          Verifying access…
        </div>
      </div>
    )
  }

  // RENDER: access denied
  if (isAdmin === false) {
    return (
      <div className="blog-admin-denied">
        <div className="blog-admin-denied-icon">🔒</div>
        <h2>Access Denied</h2>
        <p>Your account does not have admin permissions. You will be signed out shortly.</p>
      </div>
    )
  }

  // ──────────────────────────────────────────────────────────────
  // RENDER: post editor
  // ──────────────────────────────────────────────────────────────
  if (editingPost !== null) {
    return (
      <div className="blog-admin">
        <div className="blog-admin-shell">
          <div className="blog-admin-editor-wrap">
            <div className="blog-admin-editor-header">
              <button
                className="blog-admin-editor-back"
                onClick={() => { setEditingPost(null); setSaveError(null); setSaveSuccess(false) }}
              >
                ← Back
              </button>
              <h2 className="blog-admin-editor-h2">
                {editingPost.id ? 'Edit Post' : 'New Post'}
              </h2>
            </div>

            {saveSuccess && (
              <div className="blog-admin-form-feedback success" style={{ marginBottom: '20px' }}>
                ✓ Post saved successfully.
              </div>
            )}

            <form className="blog-admin-form" onSubmit={handleSave}>
              {/* Title + Slug */}
              <div className="blog-admin-form-row">
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="f-title">Title *</label>
                  <input
                    id="f-title"
                    name="title"
                    value={editorTitle}
                    onChange={e => {
                      const val = e.target.value
                      setEditorTitle(val)
                      if (!slugManuallyEdited) setEditorSlug(toSlug(val))
                    }}
                    placeholder="Post title"
                    required
                    className="input-field"
                  />
                </div>
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="f-slug">
                    Slug * {!slugManuallyEdited && editorTitle && (
                      <span style={{ fontWeight: 400, opacity: 0.5, textTransform: 'none', letterSpacing: 0 }}>auto</span>
                    )}
                  </label>
                  <input
                    id="f-slug"
                    name="slug"
                    value={editorSlug}
                    onChange={e => {
                      setEditorSlug(e.target.value)
                      setSlugManuallyEdited(true)
                    }}
                    placeholder="my-post-slug"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="blog-admin-field">
                <label className="blog-admin-label" htmlFor="f-subtitle">Subtitle</label>
                <input id="f-subtitle" name="subtitle" defaultValue={String(editingPost.subtitle || '')} placeholder="Optional subtitle" className="input-field" />
              </div>

              {/* Excerpt */}
              <div className="blog-admin-field">
                <label className="blog-admin-label" htmlFor="f-excerpt">Excerpt * <span style={{ fontWeight: 400, opacity: 0.6 }}>(used in cards & SEO)</span></label>
                <textarea id="f-excerpt" name="excerpt" defaultValue={String(editingPost.excerpt || '')} placeholder="Short summary (1–2 sentences, under 160 chars)" required className="input-field" rows={2} />
              </div>

              {/* Content */}
              <div className="blog-admin-field">
                <label className="blog-admin-label" htmlFor="f-content">Content * <span style={{ fontWeight: 400, opacity: 0.6 }}>(Markdown)</span></label>
                <textarea
                  id="f-content"
                  name="content"
                  defaultValue={String(editingPost.content || '')}
                  placeholder="Write your post in Markdown…"
                  required
                  className="input-field"
                  rows={20}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.65 }}
                />
              </div>

              {/* Cover image + Author */}
              <div className="blog-admin-form-row">
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="f-cover">Cover Image URL</label>
                  <input id="f-cover" name="cover_image_url" defaultValue={String(editingPost.cover_image_url || '')} placeholder="https://…" className="input-field" />
                </div>
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="f-author">Author *</label>
                  <input id="f-author" name="author_name" defaultValue={String(editingPost.author_name || '')} placeholder="Author name" required className="input-field" />
                </div>
              </div>

              {/* Category + Status + Published at */}
              <div className="blog-admin-form-row">
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="f-category">Category</label>
                  <select id="f-category" name="category_id" defaultValue={String(editingPost.category_id || '')} className="input-field">
                    <option value="">No Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="f-status">Status</label>
                  <select id="f-status" name="status" defaultValue={String(editingPost.status || 'draft')} className="input-field">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="blog-admin-field">
                <label className="blog-admin-label" htmlFor="f-pub">Publish Date</label>
                <input
                  id="f-pub"
                  type="datetime-local"
                  name="published_at"
                  defaultValue={editingPost.published_at ? new Date(String(editingPost.published_at)).toISOString().slice(0, 16) : ''}
                  className="input-field"
                />
              </div>

              {saveError && (
                <div className="blog-admin-form-feedback error">
                  <span>⚠</span> {saveError}
                </div>
              )}

              <div className="blog-admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingPost.id ? 'Save Changes' : 'Create Post'}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => { setEditingPost(null); setSaveError(null) }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────────────────────────────
  // RENDER: main admin dashboard
  // ──────────────────────────────────────────────────────────────
  return (
    <div className="blog-admin">
      <div className="blog-admin-shell">

        {/* Header */}
        <header className="blog-admin-header">
          <div className="blog-admin-header-left">
            <h1 className="blog-admin-title">Blog Admin</h1>
            <span className="blog-admin-subtitle">Content Management</span>
          </div>
          <div className="blog-admin-header-right">
            <div className="blog-admin-user-badge">
              <span className="blog-admin-user-dot" />
              {session.user.email}
            </div>
            <button onClick={() => supabase.auth.signOut()} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="blog-admin-stats">
          <div className="blog-admin-stat">
            <span className="blog-admin-stat-value">{posts.length}</span>
            <span className="blog-admin-stat-label">Total Posts</span>
          </div>
          <div className="blog-admin-stat">
            <span className="blog-admin-stat-value">{publishedCount}</span>
            <span className="blog-admin-stat-label">Published</span>
          </div>
          <div className="blog-admin-stat">
            <span className="blog-admin-stat-value">{draftCount}</span>
            <span className="blog-admin-stat-label">Drafts</span>
          </div>
          <div className="blog-admin-stat">
            <span className="blog-admin-stat-value">{categories.length}</span>
            <span className="blog-admin-stat-label">Categories</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="blog-admin-tabs">
          <button className={`blog-admin-tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
            Posts
          </button>
          <button className={`blog-admin-tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
            Categories
          </button>
        </div>

        {/* ── Posts Tab ── */}
        {activeTab === 'posts' && (
          <>
            {saveSuccess && (
              <div className="blog-admin-form-feedback success" style={{ marginBottom: '20px' }}>
                ✓ Post saved successfully.
              </div>
            )}

            <div className="blog-admin-toolbar">
              <h2>All Posts</h2>
              <button className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '14px' }} onClick={() => { setEditingPost({}); setSaveSuccess(false) }}>
                + New Post
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="blog-admin-empty">
                <div className="blog-admin-empty-icon">📝</div>
                <p>No posts yet. Create your first one!</p>
                <button className="btn btn-primary" onClick={() => setEditingPost({})}>Create Post</button>
              </div>
            ) : (
              <div className="blog-admin-table-wrap">
                <table className="blog-admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Category</th>
                      <th>Published At</th>
                      <th className="col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => (
                      <tr key={String(post.id)}>
                        <td className="col-title">
                          <div>{String(post.title)}</div>
                          <div className="col-title-slug">/{String(post.slug)}</div>
                        </td>
                        <td>
                          <span className={`status-badge ${String(post.status)}`}>
                            {String(post.status)}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                          {(post.blog_categories as { name?: string } | null)?.name ?? '—'}
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '13px', whiteSpace: 'nowrap' }}>
                          {post.published_at ? new Date(String(post.published_at)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        </td>
                        <td className="col-actions">
                          <button
                            onClick={() => { setEditingPost(post); setSaveSuccess(false) }}
                            className="btn btn-ghost"
                            style={{ padding: '5px 12px', fontSize: '13px' }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── Categories Tab ── */}
        {activeTab === 'categories' && (
          <>
            <div className="blog-admin-toolbar">
              <h2>Categories</h2>
              <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setShowCatForm(v => !v)}>
                {showCatForm ? 'Cancel' : '+ New Category'}
              </button>
            </div>

            {showCatForm && (
              <div className="blog-admin-cat-add" style={{ marginBottom: '20px' }}>
                <form className="blog-admin-cat-add-form" onSubmit={handleSaveCategory}>
                  <div className="blog-admin-field" style={{ flex: 1, minWidth: '160px' }}>
                    <label className="blog-admin-label">Name</label>
                    <input
                      value={catName}
                      onChange={e => { setCatName(e.target.value); setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')) }}
                      placeholder="Career Advice"
                      required
                      className="input-field"
                    />
                  </div>
                  <div className="blog-admin-field" style={{ flex: 1, minWidth: '160px' }}>
                    <label className="blog-admin-label">Slug</label>
                    <input
                      value={catSlug}
                      onChange={e => setCatSlug(e.target.value)}
                      placeholder="career-advice"
                      required
                      className="input-field"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '11px 18px', fontSize: '14px' }}>Add</button>
                  </div>
                  {catError && <p style={{ color: 'var(--ember)', fontSize: '13px', width: '100%', margin: 0 }}>{catError}</p>}
                </form>
              </div>
            )}

            {categories.length === 0 ? (
              <div className="blog-admin-empty">
                <div className="blog-admin-empty-icon">🏷️</div>
                <p>No categories yet. Add one above.</p>
              </div>
            ) : (
              <div className="blog-admin-cats">
                {categories.map(c => (
                  <div key={c.id} className="blog-admin-cat-item">
                    <div>
                      <div className="blog-admin-cat-name">{c.name}</div>
                      <div className="blog-admin-cat-slug">/{c.slug}</div>
                    </div>
                    <span className="tag">{posts.filter(p => (p.blog_categories as { name?: string } | null)?.name === c.name).length} posts</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
