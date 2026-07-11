import { useState } from 'react'
import type { Page } from '../App'

interface Props {
  current: Page
  navigate: (p: Page) => void
  onOpenWaitlist: () => void
}

const links: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Features', page: 'features' },
  { label: 'For Who', page: 'for-who' },
  { label: 'About', page: 'about' },
]

export default function Nav({ current, navigate, onOpenWaitlist }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const getHref = (p: Page) => {
    if (typeof window === 'undefined') return p === 'home' ? '/' : `/${p}`
    const isSubdir = window.location.pathname.startsWith('/JobHunter-Website')
    const prefix = isSubdir ? '/JobHunter-Website' : ''
    return p === 'home' ? `${prefix}/` : `${prefix}/${p}`
  }

  const handleNavigate = (e: React.MouseEvent, p: Page) => {
    e.preventDefault()
    navigate(p)
    setMenuOpen(false)
  }

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <a
          href={getHref('home')}
          className="nav-logo"
          onClick={(e) => handleNavigate(e, 'home')}
          aria-label="JobHunter home"
        >
          Job<span>Hunter</span>
        </a>
        <ul className="nav-links">
          {links.map(({ label, page }) => (
            <li key={page}>
              <a
                href={getHref(page)}
                className={`nav-link${current === page ? ' active' : ''}`}
                onClick={(e) => handleNavigate(e, page)}
                aria-current={current === page ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta-group">
          <button className="btn btn-primary nav-cta nav-cta-small" onClick={onOpenWaitlist}>
            <span><strong>Hunt Jobs</strong></span>
          </button>
          <a
            href={getHref('referral')}
            className={`btn btn-ghost nav-referral-btn${current === 'referral' ? ' active' : ''}`}
            onClick={(e) => handleNavigate(e, 'referral')}
            aria-current={current === 'referral' ? 'page' : undefined}
            id="nav-referral-btn"
          >
            <span>Refer a Friend</span>
          </a>
        </div>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-icon${menuOpen ? ' open' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu" role="menu">
          {links.map(({ label, page }) => (
            <a
              key={page}
              href={getHref(page)}
              className={`nav-mobile-link${current === page ? ' active' : ''}`}
              onClick={(e) => handleNavigate(e, page)}
              role="menuitem"
            >
              {label}
            </a>
          ))}
          <div className="nav-mobile-actions">
            <button className="btn btn-primary" onClick={() => { onOpenWaitlist(); setMenuOpen(false) }}>
              Hunt Jobs
            </button>
            <a
              href={getHref('referral')}
              className={`btn btn-ghost nav-referral-btn${current === 'referral' ? ' active' : ''}`}
              onClick={(e) => handleNavigate(e, 'referral')}
            >
              Refer a Friend
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
