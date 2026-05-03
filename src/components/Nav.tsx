import type { Page } from '../App'

interface Props {
  current: Page
  navigate: (p: Page) => void
}

const links: { label: string; page: Page }[] = [
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Features', page: 'features' },
  { label: 'For Who', page: 'for-who' },
]

export default function Nav({ current, navigate }: Props) {
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
        <button className="btn btn-primary nav-cta" onClick={() => navigate('home')}>
          Join Waitlist
        </button>
      </div>
    </nav>
  )
}
