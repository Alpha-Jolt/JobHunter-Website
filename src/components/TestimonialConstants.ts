export type TestimonialSource = 'ph' | 'li' | 'ig' | 'dm' | 'yt' | 'article' | 'x' | 'reddit' | 'peerlist'

export interface Testimonial {
  id: string
  name: string
  quote: string
  source: TestimonialSource
}

export const sourceLabels: Record<TestimonialSource, string> = {
  ph: 'Product Hunt',
  li: 'LinkedIn',
  ig: 'Instagram',
  dm: 'Direct Message',
  yt: 'YouTube',
  article: 'Article',
  x: 'X',
  reddit: 'Reddit',
  peerlist: 'Peerlist'
}
