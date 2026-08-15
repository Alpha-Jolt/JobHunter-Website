import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

// Read .env file for Supabase credentials
const envPath = path.resolve(__dirname, '../.env');
let supabaseUrl = process.env.VITE_SUPABASE_URL || '';
let supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
let siteUrl = process.env.VITE_SITE_URL || 'https://myjobhunter.in';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
    if (line.startsWith('VITE_SITE_URL=')) siteUrl = line.split('=')[1].trim();
  });
}

const faqs = [
  { q: 'What is JobHunter?', a: 'JobHunter is an AI-powered, human-in-the-loop job search companion. We automate job discovery, tailor your resume to each role without fabricating experience, and prepare applications for your explicit approval.' },
  { q: 'How does JobHunter find jobs for me?', a: 'JobHunter scrapes relevant job listings from major platforms like Naukri and Indeed. We bring the best opportunities directly to your dashboard so you don\'t have to spend hours searching manually.' },
  { q: 'Does JobHunter automatically apply to jobs?', a: 'No, and this is by design. JobHunter prepares your application, but every resume variant and cover letter sits in an approval queue. Nothing is sent without your explicit sign-off.' },
  { q: 'Does JobHunter customize my resume for every job?', a: 'Yes. The AI analyzes each job description and curates your existing resume content to highlight the most relevant skills and experience. It never fabricates or invents credentials.' },
  { q: 'Does JobHunter write my cover letter?', a: 'Yes. JobHunter generates a personalized cover letter for each role based on your tailored resume and the specific job requirements. You can review and edit it before sending.' },
  { q: 'Can JobHunter apply using my Gmail or Outlook account?', a: 'Yes. Once you approve an application, JobHunter uses a secure bridge to send the email directly from your connected Gmail or Outlook account, so you own the communication thread.' },
  { q: 'How is JobHunter different from LinkedIn or Indeed?', a: 'LinkedIn and Indeed are job boards where you manually search and apply. JobHunter is a job search companion that sits on top of those boards, automating the discovery, tailoring, and drafting process for you.' },
  { q: 'Who is JobHunter built for?', a: 'JobHunter is designed for college students, recent graduates, unemployed professionals, and freelancers who need to scale their job search without losing quality or burning out.' },
  { q: 'Is JobHunter free to use?', a: 'The core job search and application automation is free during beta. Advanced Skill Development Programs (Phase 3) will be paid, with a full refund guarantee if you don\'t get placed.' },
  { q: 'Is JobHunter available outside India?', a: 'While our platform is currently optimized for the Indian job market (covering Naukri and Indeed India), it is not restricted. Job seekers globally can use JobHunter, and we plan to expand coverage to more international job boards soon.' },
  { q: 'Is my data safe?', a: 'Absolutely. The scraped job dataset has no external export endpoints. We are building in public with privacy first, incorporating GDPR and India\'s DPDPA compliance into our roadmap.' },
  { q: 'Can I become a mentor?', a: 'Yes. We\'re onboarding mentors for Phase 3. Head to the For Who page and fill in the mentor form to join our verified professional network.' },
];

const pages = [
  {
    path: 'features',
    title: 'AI Job Search Automation Features | JobHunter',
    desc: 'Explore the key features of JobHunter, including multi-source job scraping, AI resume tailoring, human-in-the-loop approval, and scam detection.',
    canonical: `${siteUrl}/features`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'JobHunter Features',
      'description': 'Explore the key features of JobHunter, including multi-source job scraping, AI resume tailoring, human-in-the-loop approval, and scam detection.',
      'url': `${siteUrl}/features`,
      'about': { '@type': 'SoftwareApplication', 'name': 'JobHunter' }
    }
  },
  {
    path: 'for-who',
    title: 'Who is JobHunter For? — College Students, Grads & Mentors',
    desc: 'JobHunter is built for college students, recent graduates, and career changers looking to scale their job search, plus active mentoring opportunities.',
    canonical: `${siteUrl}/for-who`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Who JobHunter Is For',
      'description': 'JobHunter is built for college students, recent graduates, and career changers looking to scale their job search, plus active mentoring opportunities.',
      'url': `${siteUrl}/for-who`,
      'about': { '@type': 'SoftwareApplication', 'name': 'JobHunter' }
    }
  },
  {
    path: 'how-it-works',
    title: 'How JobHunter Works — AI Job Search Companion',
    desc: 'Learn how JobHunter automates your job search: from smart scraping and AI resume tailoring to secure application submission via your email.',
    canonical: `${siteUrl}/how-it-works`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'How JobHunter Works',
      'description': 'Learn how JobHunter automates your job search: from smart scraping and AI resume tailoring to secure application submission via your email.',
      'url': `${siteUrl}/how-it-works`,
      'about': { '@type': 'SoftwareApplication', 'name': 'JobHunter' }
    }
  },
  {
    path: 'referral',
    title: 'Invite Friends & Earn 20% Off — JobHunter Referral Program',
    desc: 'Share JobHunter with your network to earn 20% off your subscription and priority cohort access for you and your friends.',
    canonical: `${siteUrl}/referral`
  },
  {
    path: 'about',
    title: 'About JobHunter — Our Story, Brand & Mission',
    desc: 'Learn about JobHunter, our origami crane brand story, mission, and the team behind the AI-powered job acquisition platform.',
    canonical: `${siteUrl}/about`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'JobHunter',
      'url': `${siteUrl}`,
      'logo': `${siteUrl}/logo.png`,
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
    canonical: `${siteUrl}/faq`,
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
    canonical: `${siteUrl}/privacy-policy`
  },
  {
    path: 'terms-of-service',
    title: 'Terms of Service — JobHunter',
    desc: 'Read our terms of service governing your access to and use of the JobHunter platform and automated application services.',
    canonical: `${siteUrl}/terms-of-service`
  },
  {
    path: 'refund-policy',
    title: 'Refund and Cancellation Policy — JobHunter',
    desc: 'Read our refund and cancellation policy to understand terms for subscription cancellations, refunds, billing errors, and consumer rights.',
    canonical: `${siteUrl}/refund-policy`
  },
  {
    path: 'blog',
    title: 'Blog — JobHunter',
    desc: 'JobHunter Blog — Job search tips, resume advice, career growth articles, and build-in-public updates.',
    canonical: `${siteUrl}/blog`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'JobHunter Blog',
      'description': 'JobHunter Blog — Job search tips, resume advice, career growth articles, and build-in-public updates.',
      'url': `${siteUrl}/blog`
    }
  }
];

if (!fs.existsSync(indexPath)) {
  console.error('Build output index.html not found! Run npm run build first.');
  process.exit(1);
}

// Read index.html
let originalHtml = fs.readFileSync(indexPath, 'utf-8');
// Fix the hidden h1 in index.html for crawler rendering
originalHtml = originalHtml.replace('<div id="root"></div>', `<div id="root"><h1 style="position:absolute;width:1px;height:1px;overflow:hidden;padding:0;margin:0;clip:rect(0,0,0,0);white-space:nowrap;border:0;">JobHunter — Human-in-the-loop AI Job Search Companion</h1></div>`);
fs.writeFileSync(indexPath, originalHtml, 'utf-8');
console.log('✓ Updated index.html with crawler h1');

async function prerender() {
  const pagesSitemapUrls = [];
  const blogSitemapUrls = [];

  // Add home
  pagesSitemapUrls.push({ loc: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' });

  // Generate subpages
  pages.forEach((page) => {
    const dirPath = path.join(distPath, page.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let pageHtml = originalHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
      .replace('<div id="root"></div>', `<div id="root"><h1 style="position:absolute;width:1px;height:1px;overflow:hidden;padding:0;margin:0;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${page.title}</h1></div>`)
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
        const canonical = `${siteUrl}/blog/${post.slug}`;
        const image = post.og_image_url || post.cover_image_url || `${siteUrl}/logo.png`;
        const datePub = post.published_at || post.created_at;

        // Blog post specific schemas
        const blogSchema = {
          "@context": "https://schema.org",
          "@type": post.schema_type || "BlogPosting",
          "headline": title,
          "description": desc,
          "image": image,
          "author": { "@type": "Person", "name": post.author_name },
          "publisher": { "@type": "Organization", "name": "JobHunter", "logo": `${siteUrl}/logo.png` },
          "datePublished": datePub,
          "dateModified": post.updated_at,
          "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
        };

        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}` },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
            { "@type": "ListItem", "position": 3, "name": title, "item": canonical }
          ]
        };

        let pageHtml = originalHtml
          .replace(/<title>[^<]*<\/title>/, `<title>${title} — JobHunter Blog</title>`)
          .replace('<div id="root"></div>', `<div id="root"><h1 style="position:absolute;width:1px;height:1px;overflow:hidden;padding:0;margin:0;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${title}</h1></div>`)
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
  let blogSitemapEntry = '';
  if (blogSitemapUrls.length > 0) {
    const blogSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogSitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : `<lastmod>${today}</lastmod>`}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(distPath, 'sitemap-blog.xml'), blogSitemapXml, 'utf-8');
    console.log(`✓ Generated sitemap-blog.xml (${blogSitemapUrls.length} posts)`);

    blogSitemapEntry = `
  <sitemap>
    <loc>${siteUrl}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;
  } else {
    // If the file exists from a previous build, remove it so it returns 404
    const blogSitemapPath = path.join(distPath, 'sitemap-blog.xml');
    if (fs.existsSync(blogSitemapPath)) {
      fs.unlinkSync(blogSitemapPath);
    }
    console.log(`✓ Skipped sitemap-blog.xml (0 posts)`);
  }

  // ── sitemap.xml (sitemap index) ────────────────────────────────────────
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>${blogSitemapEntry}
</sitemapindex>`;

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapIndexXml, 'utf-8');
  console.log('✓ Generated sitemap.xml (sitemap index)');

  console.log('Static route pre-rendering complete successfully.');
}

prerender().catch(console.error);
