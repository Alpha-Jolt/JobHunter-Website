import { useState } from 'react'

interface Props {
  onOpenWaitlist?: () => void
}

const links = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'For Who', path: '/for-who' },
  { label: 'About', path: '/about' },
]

import { Link, NavLink } from 'react-router-dom'

export default function Nav({ onOpenWaitlist }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-inner">
        <Link
          to="/"
          className="nav-logo"
          onClick={handleLinkClick}
          aria-label="JobHunter home"
        >
          Job<span>Hunter</span>
        </Link>
        <ul className="nav-links">
          {links.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={handleLinkClick}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="nav-cta-group">
          <button className="btn btn-primary nav-cta nav-cta-small" onClick={onOpenWaitlist}>
            <span><strong>Join Beta</strong></span>
          </button>
          <NavLink
            to="/referral"
            className={({ isActive }) => `btn btn-ghost nav-referral-btn${isActive ? ' active' : ''}`}
            onClick={handleLinkClick}
            id="nav-referral-btn"
          >
            <span>Refer a Friend</span>
          </NavLink>
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
        <div className="nav-mobile-menu">
          {links.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-mobile-link${isActive ? ' active' : ''}`}
              onClick={handleLinkClick}
            >
              {label}
            </NavLink>
          ))}
          <div className="nav-mobile-actions">
            <button className="btn btn-primary" onClick={() => { onOpenWaitlist?.(); setMenuOpen(false) }}>
              Join Beta
            </button>
            <NavLink
              to="/referral"
              className={({ isActive }) => `btn btn-ghost nav-referral-btn${isActive ? ' active' : ''}`}
              onClick={handleLinkClick}
            >
              Refer a Friend
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
