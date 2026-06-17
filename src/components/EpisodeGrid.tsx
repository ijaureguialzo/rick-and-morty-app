import { useRickMorty } from '../hooks/useRickMorty'
import { fetchEpisodes } from '../api/client'

export default function EpisodeGrid() {
  const { data, loading, error } = useRickMorty(fetchEpisodes)

  if (loading && data.length === 0) {
    return <LoadingMessage text="Scanning episode frequencies..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="episode-grid">
      {data.map((ep) => {
        const epNum = parseInt(ep.episode.replace('E', ''))
        return (
          <article key={ep.id} className="episode-card">
            <div className="episode-number">E{String(epNum).padStart(2, '0')}</div>
            <div className="episode-info">
              <h3 className="episode-name">{ep.name}</h3>
              <span className="episode-air-date">{ep.air_date}</span>
              <p className="episode-characters">
                {ep.characters.length} signal(s) detected
              </p>
            </div>
          </article>
        )
      })}

      {data.length > 0 && (
        <button className="load-more-btn" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
          Scan More Frequencies →
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
