import { useState, useCallback } from 'react'
import RadioHeader from './components/RadioHeader'
import DimensionTuner from './components/DimensionTuner'
import CharacterGrid from './components/CharacterGrid'
import EpisodeGrid from './components/EpisodeGrid'
import LocationGrid from './components/LocationGrid'
import QuoteGenerator from './components/QuoteGenerator'
import FavoritesPanel from './components/FavoritesPanel'
import PortalTransition from './components/PortalTransition'
import type { Dimension } from './api/types'

const dimensionLabels: Record<Dimension, string> = {
  characters: '🧬 Characters',
  episodes: '📺 Episodes',
  locations: '🗺️ Locations',
  quotes: '📡 Quotes',
  favorites: '⭐ Favorites',
}

const dimensionTitles: Record<Dimension, string> = {
  characters: 'TUNE INTO THE CHARACTERS BROADCAST',
  episodes: 'CATCH EPISODE FREQUENCIES',
  locations: 'TRACK DOWN LOCATION SIGNALS',
  quotes: 'INTERDIMENSIONAL CABLE — RANDOM QUOTES',
  favorites: 'YOUR FAVORITE DIMENSION',
}

export default function App() {
  const [dimension, setDimension] = useState<Dimension>('characters')
  const [showPortal, setShowPortal] = useState(false)
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('rm-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const switchDimension = useCallback((next: Dimension) => {
    if (next === dimension) return
    setShowPortal(true)
    setTimeout(() => {
      setDimension(next)
      setShowPortal(false)
    }, 1200)
  }, [dimension])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem('rm-favorites', JSON.stringify(next))
      return next
    })
  }, [])

  const renderContent = () => {
    switch (dimension) {
      case 'characters':
        return <CharacterGrid />
      case 'episodes':
        return <EpisodeGrid />
      case 'locations':
        return <LocationGrid />
      case 'quotes':
        return <QuoteGenerator />
      case 'favorites':
        return <FavoritesPanel favorites={favorites} onToggleFavorite={toggleFavorite} />
    }
  }

  return (
    <div className="app">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Flicker effect */}
      <div className="flicker-layer" />

      {/* Portal Transition */}
      {showPortal && <PortalTransition />}

      {/* Main Content */}
      <RadioHeader title={dimensionTitles[dimension]} />
      <main className="main-content">
        <DimensionTuner
          current={dimension}
          onChange={switchDimension}
          labels={dimensionLabels}
        />
        <section className="content-area" key={dimension}>
          {renderContent()}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span className="footer-text">Wubba Lubba Dub Dub — Interdimensional Radio v1.0</span>
      </footer>
    </div>
  )
}
