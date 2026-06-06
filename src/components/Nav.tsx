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
]

export default function Nav({ current, navigate, onOpenWaitlist }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (p: Page) => {
    navigate(p)
    setMenuOpen(false)
  }

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => handleNavigate('home')} aria-label="JobHunter home">
          Job<span>Hunter</span>
        </button>
        <ul className="nav-links">
          {links.map(({ label, page }) => (
            <li key={page}>
              <button
                className={`nav-link${current === page ? ' active' : ''}`}
                onClick={() => handleNavigate(page)}
                aria-current={current === page ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-cta-group">
          <button className="btn btn-primary nav-cta nav-cta-small" onClick={onOpenWaitlist}>
            <span>Hunt Jobs</span>
          </button>
          <button
            className={`btn btn-ghost nav-referral-btn${current === 'referral' ? ' active' : ''}`}
            onClick={() => handleNavigate('referral')}
            aria-current={current === 'referral' ? 'page' : undefined}
            id="nav-referral-btn"
          >
            <span>Refer a Friend</span>
          </button>
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
            <button
              key={page}
              className={`nav-mobile-link${current === page ? ' active' : ''}`}
              onClick={() => handleNavigate(page)}
              role="menuitem"
            >
              {label}
            </button>
          ))}
          <div className="nav-mobile-actions">
            <button className="btn btn-primary" onClick={() => { onOpenWaitlist(); setMenuOpen(false) }}>
              Hunt Jobs
            </button>
            <button
              className={`btn btn-ghost nav-referral-btn${current === 'referral' ? ' active' : ''}`}
              onClick={() => handleNavigate('referral')}
            >
              Refer a Friend
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
