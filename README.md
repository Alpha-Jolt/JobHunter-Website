# JobHunter — Website

Pre-launch marketing website for [JobHunter](../app/JobHunter/README.md), the intelligent job acquisition platform.

Built with React + TypeScript + Vite.

## What's Inside

Five client-side pages with no router dependency:

| Page | Route (internal) | Purpose |
|---|---|---|
| Home | `home` | Hero, How It Works, Principles, Roadmap |
| How It Works | `how-it-works` | Step-by-step pipeline breakdown |
| Features | `features` | Full feature grid tagged by phase |
| For Who | `for-who` | Audience cards + mentor signup |
| FAQ | `faq` | Accordion of common questions |

Email capture appears in five places (hero, features CTA, roadmap CTA, for-who CTA, mentor form). Each instance passes a `source` prop for origin tracking when a backend is wired up.

## Structure

```
src/
├── components/
│   ├── EmailCapture.tsx   # Reusable email input with validation + feedback
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── ForWho.tsx
│   ├── Principles.tsx
│   ├── Roadmap.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx         # GitHub + Instagram social icons
├── App.tsx                # Page state + routing
├── App.css                # Component styles
└── index.css              # Design tokens + shared utilities
```

## Dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Wiring Up the Email Capture

The `EmailCapture` component currently mocks the API call with a `setTimeout`. Replace it with your real endpoint in `src/components/EmailCapture.tsx`:

```ts
// Replace this:
await new Promise((r) => setTimeout(r, 900))

// With your actual call, e.g.:
const res = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, source }),
})
if (!res.ok) throw new Error('signup failed')
```
