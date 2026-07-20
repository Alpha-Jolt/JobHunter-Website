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
              alt="JobHunter - We find you a job on autopilot mode | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1186214&theme=light&t=1784360336451"
            />
          </a>
          <a href="https://www.welaunch.sh/products/jobhunter" target="_blank" rel="noopener noreferrer">
            <img src="https://www.welaunch.sh/welaunch-badge.svg" alt="Featured on welaunch.sh" width="200" height="50" />
          </a>
        </div>
      </div>
    </section>
  )
}
