import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

const posthogKey = import.meta.env.VITE_POSTHOG_API_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

// Disable PostHog on localhost to prevent adblocker ERR_BLOCKED_BY_CLIENT spam
if (posthogKey && !isLocalhost) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only',
    capture_pageview: false,
  })
}

const basename = window.location.pathname.startsWith('/JobHunter-Website') ? '/JobHunter-Website' : ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Remove the static crawler content fallback after React has mounted.
// Crawlers read it during initial HTML parse; JS users get the React app.
// aria-hidden="true" + off-screen CSS already protects real users,
// but removing it keeps the DOM clean.
const removeCrawlerContent = () => {
  const crawlerEl = document.getElementById('crawler-content')
  if (crawlerEl) crawlerEl.remove()
}
if (typeof window.requestIdleCallback === 'function') {
  window.requestIdleCallback(removeCrawlerContent, { timeout: 2000 })
} else {
  setTimeout(removeCrawlerContent, 200)
}
