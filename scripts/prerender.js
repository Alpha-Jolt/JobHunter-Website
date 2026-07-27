import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

// Read .env file for Supabase credentials
const envPath = path.resolve(__dirname, '../.env');
let supabaseUrl = '';
let supabaseKey = '';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
  });
}

const faqs = [
  {
    q: 'What is JobHunter?',
    a: 'JobHunter is an AI-powered, human-in-the-loop job acquisition platform. We automate job discovery, tailor your resume to each role without fabricating experience, and prepare applications for your explicit approval.',
  },
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
    canonical: 'https://myjobhunter.in/features',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'JobHunter Features',
      'description': 'Explore the key features of JobHunter, including multi-source job scraping, AI resume tailoring, human-in-the-loop approval, and scam detection.',
      'url': 'https://myjobhunter.in/features',
      'about': { '@type': 'SoftwareApplication', 'name': 'JobHunter' }
    }
  },
  {
    path: 'for-who',
    title: 'Who is JobHunter For? — College Students, Grads & Mentors',
    desc: 'JobHunter is built for college students, recent graduates, and career changers looking to scale their job search, plus active mentoring opportunities.',
    canonical: 'https://myjobhunter.in/for-who',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Who JobHunter Is For',
      'description': 'JobHunter is built for college students, recent graduates, and career changers looking to scale their job search, plus active mentoring opportunities.',
      'url': 'https://myjobhunter.in/for-who',
      'about': { '@type': 'SoftwareApplication', 'name': 'JobHunter' }
    }
  },
  {
    path: 'referral',
    title: 'Invite Friends & Earn 20% Off — JobHunter Referral Program',
    desc: 'Share JobHunter with your network to earn 20% off your subscription and priority cohort access for you and your friends.',
    canonical: 'https://myjobhunter.in/referral'
  },
  {
    path: 'about',
    title: 'About JobHunter — Our Story, Brand & Mission',
    desc: 'Learn about JobHunter, our origami crane brand story, mission, and the team behind the AI-powered job acquisition platform.',
    canonical: 'https://myjobhunter.in/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'JobHunter',
      'url': 'https://myjobhunter.in',
      'logo': 'https://myjobhunter.in/logo.png',
      'description': 'AI-powered human-in-the-loop job acquisition platform that automates job discovery, tailors resumes with AI, and sends applications on your behalf.',
      'sameAs': [
        'https://github.com/alpha-jolt/jobhunter',
        'https://instagram.com/myjobhunter.in',
        'https://linkedin.com/company/my-jobhunter',
        'https://x.com/myjobhunterhq'
      ]
    }
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
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy — JobHunter',
    desc: 'Read our privacy policy to understand how we collect, process, and protect your personal data under DPDPA and GDPR.',
    canonical: 'https://myjobhunter.in/privacy-policy'
  },
  {
    path: 'terms-of-service',
    title: 'Terms of Service — JobHunter',
    desc: 'Read our terms of service governing your access to and use of the JobHunter platform and automated application services.',
    canonical: 'https://myjobhunter.in/terms-of-service'
  },
  {
    path: 'refund-policy',
    title: 'Refund and Cancellation Policy — JobHunter',
    desc: 'Read our refund and cancellation policy to understand terms for subscription cancellations, refunds, billing errors, and consumer rights.',
    canonical: 'https://myjobhunter.in/refund-policy'
  },
  {
    path: 'blog',
    title: 'Blog — JobHunter',
    desc: 'JobHunter Blog — Job search tips, resume advice, career growth articles, and build-in-public updates.',
    canonical: 'https://myjobhunter.in/blog',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'JobHunter Blog',
      'description': 'JobHunter Blog — Job search tips, resume advice, career growth articles, and build-in-public updates.',
      'url': 'https://myjobhunter.in/blog'
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

async function prerender() {
  const pagesSitemapUrls = [];
  const blogSitemapUrls = [];

  // Add home
  pagesSitemapUrls.push({ loc: 'https://myjobhunter.in/', priority: '1.0', changefreq: 'weekly' });

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

    pagesSitemapUrls.push({
      loc: page.canonical,
      priority: page.path === 'blog' ? '0.9' : '0.8',
      changefreq: 'weekly'
    });
  });

  // Fetch blog posts
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*, blog_categories(name)')
      .eq('status', 'published');

    if (error) {
      console.error('Error fetching blog posts for prerendering:', error);
    } else if (posts) {
      posts.forEach(post => {
        const postPath = `blog/${post.slug}`;
        const dirPath = path.join(distPath, postPath);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        const title = post.seo_title || post.title;
        const desc = post.seo_description || post.excerpt;
        const canonical = `https://myjobhunter.in/blog/${post.slug}`;
        const image = post.og_image_url || post.cover_image_url || 'https://myjobhunter.in/logo.png';
        const datePub = post.published_at || post.created_at;

        // Blog post specific schemas
        const blogSchema = {
          "@context": "https://schema.org",
          "@type": post.schema_type || "BlogPosting",
          "headline": title,
          "description": desc,
          "image": image,
          "author": { "@type": "Person", "name": post.author_name },
          "publisher": { "@type": "Organization", "name": "JobHunter", "logo": "https://myjobhunter.in/logo.png" },
          "datePublished": datePub,
          "dateModified": post.updated_at,
          "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
        };

        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myjobhunter.in" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://myjobhunter.in/blog" },
            { "@type": "ListItem", "position": 3, "name": title, "item": canonical }
          ]
        };

        let pageHtml = originalHtml
          .replace(/<title>[^<]*<\/title>/, `<title>${title} — JobHunter Blog</title>`)
          .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`)
          .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
          .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:description" content="${desc}" />`)
          .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:url" content="${canonical}" />`)
          .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:title" content="${title}" />`)
          .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:description" content="${desc}" />`)
          .replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:url" content="${canonical}" />`);

        // Add specific OG tags for articles
        pageHtml = pageHtml.replace('</head>', `
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${image}" />
  <meta property="article:published_time" content="${datePub}" />
  <meta property="article:author" content="${post.author_name}" />
  ${post.blog_categories ? `<meta property="article:section" content="${post.blog_categories.name}" />` : ''}
  <script type="application/ld+json">\n  ${JSON.stringify(blogSchema, null, 2)}\n  </script>
  <script type="application/ld+json">\n  ${JSON.stringify(breadcrumbSchema, null, 2)}\n  </script>
</head>`);

        fs.writeFileSync(path.join(dirPath, 'index.html'), pageHtml, 'utf-8');
        console.log(`✓ Pre-rendered blog post: /${postPath}/index.html`);

        blogSitemapUrls.push({
          loc: canonical,
          lastmod: new Date(post.updated_at).toISOString().split('T')[0],
          priority: '0.7',
          changefreq: 'monthly'
        });
      });
    }
  } else {
    console.warn('⚠ Skipping blog post prerender: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing in .env');
  }

  // ── sitemap-pages.xml (static pages) ──────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const pagesSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pagesSitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distPath, 'sitemap-pages.xml'), pagesSitemapXml, 'utf-8');
  console.log('✓ Generated sitemap-pages.xml');

  // ── sitemap-blog.xml (blog posts) ──────────────────────────────────────
  const blogSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogSitemapUrls.length > 0
      ? blogSitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : `<lastmod>${today}</lastmod>`}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')
      : '  <!-- No published blog posts yet -->'}
</urlset>`;

  fs.writeFileSync(path.join(distPath, 'sitemap-blog.xml'), blogSitemapXml, 'utf-8');
  console.log(`✓ Generated sitemap-blog.xml (${blogSitemapUrls.length} posts)`);

  // ── sitemap.xml (sitemap index) ────────────────────────────────────────
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://myjobhunter.in/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://myjobhunter.in/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapIndexXml, 'utf-8');
  console.log('✓ Generated sitemap.xml (sitemap index)');

  console.log('Static route pre-rendering complete successfully.');
}

prerender().catch(console.error);
