import { useEffect, useRef } from 'react'

/** IntersectionObserver scroll-reveal for `.reveal` descendants. Respects reduced-motion via CSS. */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (els.length === 0) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const delay = el.dataset.delay ?? '0'
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('visible')
          io.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return ref
}
