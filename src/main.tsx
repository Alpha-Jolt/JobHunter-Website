import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
