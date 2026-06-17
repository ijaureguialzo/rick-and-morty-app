import { useRickMorty } from '../hooks/useRickMorty'
import { fetchLocations } from '../api/client'

export default function LocationGrid() {
  const { data, loading, error } = useRickMorty(fetchLocations)

  if (loading && data.length === 0) {
    return <LoadingMessage text="Tracking down location signals..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="location-grid">
      {data.map((loc) => (
        <article key={loc.id} className="location-card">
          <div className="signal-icon">📡</div>
          <div className="location-info">
            <h3 className="location-name">{loc.name}</h3>
            <div className="location-tags">
              <span className="tag type-tag">{loc.type}</span>
              <span className="tag dim-tag">{loc.dimension}</span>
            </div>
          </div>
        </article>
      ))}

      {data.length > 0 && (
        <button className="load-more-btn" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
          Track More Signals →
        </button>
      )}
    </div>
  )
}

function LoadingMessage({ text }: { text: string }) {
  return (
    <div className="loading-message">
      <div className="portal-spinner" />
      <p>{text}</p>
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <p>Signal lost: {message}</p>
      <button className="retry-btn" onClick={() => window.location.reload()}>
        Re-establish Connection
      </button>
    </div>
  )
}
