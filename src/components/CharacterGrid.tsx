import { useRickMorty } from '../hooks/useRickMorty'
import { fetchCharacters } from '../api/client'

export default function CharacterGrid() {
  const { data, loading, error } = useRickMorty(fetchCharacters)

  if (loading && data.length === 0) {
    return <LoadingMessage text="Tuning into character frequencies..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="character-grid">
      {data.map((char) => (
        <article key={char.id} className="character-card">
          <div className="card-image-wrapper">
            <img src={char.image} alt={char.name} loading="lazy" />
            <span className={`status-badge ${getStatusClass(char.status)}`}>
              {char.status}
            </span>
          </div>
          <div className="card-info">
            <h3 className="character-name">{char.name}</h3>
            <div className="character-details">
              <span className="detail-item">
                <strong>Species:</strong> {char.species}
              </span>
              <span className="detail-item">
                <strong>Type:</strong> {char.type || 'N/A'}
              </span>
              <span className="detail-item">
                <strong>Gender:</strong> {char.gender}
              </span>
            </div>
            <p className="location-text">
              Last known at: <strong>{char.location.name}</strong>
            </p>
          </div>
        </article>
      ))}

      {data.length > 0 && (
        <button className="load-more-btn" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
          Load More Frequencies →
        </button>
      )}
    </div>
  )
}

function getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'alive': return 'alive'
    case 'dead': return 'dead'
    default: return 'unknown'
  }
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
