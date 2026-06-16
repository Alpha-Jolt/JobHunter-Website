import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

const faqs = [
  {
    q: 'Is JobHunter free to use?',
    a: 'The core job search and application automation features will be free during beta. Skill Development Programs (Phase 3) are paid, with a full refund if you don\'t get placed.',
  },
  {
    q: 'Will the AI fabricate anything on my resume?',
    a: 'Never. The AI curates and reorders your existing resume content to match each job description. It identifies skill gaps but never invents experience, skills, or credentials.',
  },
  {
    q: 'Do applications go out without my approval?',
    a: 'No. Every AI-generated resume variant and cover letter sits in an approval queue. Nothing is sent until you explicitly sign off on it.',
  },
  {
    q: 'Which job boards does JobHunter scrape?',
    a: 'Phase 0 covers Naukri and Indeed. LinkedIn and additional sources are planned for Phase 1. All scraped data stays in your private database — it is never exported.',
  },
  {
    q: 'How does the Skill Development Program work?',
    a: 'Verified working professionals run one-on-one or group sessions tailored to your job requirements or identified skill gaps. If you complete the program and don\'t get placed, your fee is refunded automatically.',
  },
  {
    q: 'Can I become a mentor?',
    a: 'Yes. We\'re onboarding mentors for Phase 3. Head to the For Who page and fill in the mentor interest form — we\'ll reach out with details.',
  },
  {
    q: 'When does JobHunter launch?',
    a: 'We\'re currently in Phase 0 — building and validating the core engine. Join the waitlist to get notified when early access opens.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. The scraped job dataset has no external export endpoints. GDPR and India\'s DPDPA consent and deletion workflows are built into the Phase 4 roadmap.',
  },
];

const pages = [
  {
    path: 'features',
    title: 'AI Job Search Automation Features | JobHunter',
    desc: 'Explore the key features of JobHunter, including multi-source job scraping, AI resume tailoring, human-in-the-loop approval, and scam detection.',
    canonical: 'https://myjobhunter.in/features'
  },
  {
    path: 'for-who',
    title: 'Who is JobHunter For? — College Students, Grads & Mentors',
    desc: 'JobHunter is built for college students, recent graduates, and career changers looking to scale their job search, plus active mentoring opportunities.',
    canonical: 'https://myjobhunter.in/for-who'
  },
  {
    path: 'referral',
    title: 'Invite Friends & Earn 20% Off — JobHunter Referral Program',
    desc: 'Share JobHunter with your network to earn 20% off your subscription and priority cohort access for you and your friends.',
    canonical: 'https://myjobhunter.in/referral'
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions — JobHunter',
    desc: 'Find answers to common questions about JobHunter\'s core engine, AI safety, job boards scraped, data privacy, and the mentoring program.',
    canonical: 'https://myjobhunter.in/faq',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a,
        },
      })),
    }
  }
];

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': 'JobHunter',
  'applicationCategory': 'BusinessApplication',
  'description': 'AI powered job acquisition platform',
  'url': 'https://myjobhunter.in'
};

if (!fs.existsSync(indexPath)) {
  console.error('Build output index.html not found! Run npm run build first.');
  process.exit(1);
}

// Read index.html
let originalHtml = fs.readFileSync(indexPath, 'utf-8');

// Inject SoftwareApplication schema into homepage
const homepageSchemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(homepageSchema, null, 2)}\n  </script>\n`;
let homepageHtml = originalHtml.replace('</head>', `${homepageSchemaScript}</head>`);
fs.writeFileSync(indexPath, homepageHtml, 'utf-8');
console.log('✓ Injected homepage schema into /dist/index.html');

// Generate subpages
pages.forEach((page) => {
  const dirPath = path.join(distPath, page.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let pageHtml = originalHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${page.desc}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${page.canonical}" />`)
    // Update Open Graph tags
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:description" content="${page.desc}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:url" content="${page.canonical}" />`)
    // Update Twitter tags
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:description" content="${page.desc}" />`)
    .replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:url" content="${page.canonical}" />`);

  // Inject schema if page has one
  if (page.schema) {
    const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(page.schema, null, 2)}\n  </script>\n`;
    pageHtml = pageHtml.replace('</head>', `${schemaScript}</head>`);
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), pageHtml, 'utf-8');
  console.log(`✓ Pre-rendered subpage: /${page.path}/index.html`);
});

console.log('Static route pre-rendering complete successfully.');
