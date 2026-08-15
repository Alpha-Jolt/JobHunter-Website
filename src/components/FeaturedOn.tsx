import { useReveal } from '../hooks/useReveal'

export default function FeaturedOn() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="featured-on" ref={ref} style={{
      padding: '48px 20px',
      textAlign: 'center',
      backgroundColor: 'var(--wash)',
      borderTop: '1px solid var(--hairline)',
      borderBottom: '1px solid var(--hairline)'
    }}>
      <div className="reveal">
        <div className="section-label" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'var(--ink)' }}>
          <img
            src="/laurel_wreath.png"
            alt="Laurel left"
            style={{
              height: '32px',
              transform: 'scaleX(-1)'
            }}
          />
          Featured On
          <img
            src="/laurel_wreath.png"
            alt="Laurel right"
            style={{
              height: '32px'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <a
            href="https://www.producthunt.com/products/jobhunter-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-jobhunter-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="JobHunter - Human-in-the-loop AI Job Search Companion | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1186214&theme=light&t=1784360336451"
            />
          </a>
          <a
            href="https://peerlist.io/aj18s/project/jobhunter--land-your-next-job-on-autopilot"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://peerlist.io/api/v1/projects/embed/PRJHLKLBOGGLPBDEMCPD6PPQQL7RKA?showUpvote=false&theme=light"
              alt="JobHunter — Human-in-the-loop AI Job Search Companion"
              style={{ width: 'auto', height: '54px' }}
            />
          </a>
          <a href="https://launchpadindia.co/listing/7c387e7c-39f2-4354-a3a0-b1118f310ef5" target="_blank" rel="noopener noreferrer" aria-label="Featured on LaunchPad India" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px 16px 12px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', textDecoration: 'none', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif", boxShadow: '0 1px 2px rgba(15,23,42,0.05), 0 8px 24px -8px rgba(15,23,42,0.12)', lineHeight: 1, maxWidth: '100%' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: '#6b7280', textTransform: 'uppercase' }}>FEATURED ON</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0, lineHeight: 1 }}>
              <img src="https://launchpadindia.co/logo.png" alt="" width="22" height="22" style={{ objectFit: 'contain', display: 'block', marginRight: 0 }} />
              <span style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.015em', color: '#0f172a' }}>LaunchPad<span style={{ color: '#f97316' }}>India</span></span>
            </span>
          </a>
          <a href="https://www.welaunch.sh/products/jobhunter" target="_blank" rel="noopener noreferrer">
            <img src="https://www.welaunch.sh/welaunch-badge.svg" alt="Featured on welaunch.sh" width="200" height="50" />
          </a>
        </div>
      </div>
    </section>
  )
}
