import type { Page } from '../App'

interface Props {
  current: Page
  navigate: (p: Page) => void
  onOpenWaitlist: () => void
}

const links: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Features', page: 'features' },
  { label: 'For Who', page: 'for-who' },
]

export default function Nav({ current, navigate, onOpenWaitlist }: Props) {
  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => navigate('home')} aria-label="JobHunter home">
          Job<span>Hunter</span>
        </button>
        <ul className="nav-links">
          {links.map(({ label, page }) => (
            <li key={page}>
              <button
                className={`nav-link${current === page ? ' active' : ''}`}
                onClick={() => navigate(page)}
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
            onClick={() => navigate('referral')}
            aria-current={current === 'referral' ? 'page' : undefined}
            id="nav-referral-btn"
          >
            <span>Refer a Friend</span>
          </button>
        </div>
      </div>
    </nav>
  )
}