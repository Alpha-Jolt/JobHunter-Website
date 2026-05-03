import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import ForWho from './components/ForWho'
import Principles from './components/Principles'
import Roadmap from './components/Roadmap'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

export type Page = 'home' | 'how-it-works' | 'features' | 'for-who' | 'faq'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Nav current={page} navigate={navigate} />
      {page === 'home' && (
        <>
          <Hero navigate={navigate} />
          <HowItWorks />
          <Principles />
          <Roadmap />
        </>
      )}
      {page === 'how-it-works' && <HowItWorks standalone />}
      {page === 'features' && <Features />}
      {page === 'for-who' && <ForWho />}
      {page === 'faq' && <FAQ />}
      <Footer navigate={navigate} />
    </div>
  )
}
