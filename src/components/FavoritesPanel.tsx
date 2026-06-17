import { useRickMorty } from '../hooks/useRickMorty'

interface FavoritesPanelProps {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export default function FavoritesPanel({ favorites, onToggleFavorite }: FavoritesPanelProps) {
  // For favorites, we need to fetch individual characters by their IDs
  const { data, loading, error } = useRickMorty(
    async (page: number) => {
      if (favorites.length === 0) return { results: [], info: { count: 0, pages: 0 } }
      // Fetch all favorite characters in parallel (limit to first page worth)
      const ids = favorites.slice((page - 1) * 20, page * 20)
      const responses = await Promise.all(
        ids.map((id) => fetch(`https://rickandmortyapi.com/api/character/${id}`)),
      )
      const results = await Promise.all(responses.map((r) => r.json()))
      return { results, info: { count: favorites.length, pages: Math.ceil(favorites.length / 20) } }
    },
    1,
  )

  if (loading && data.length === 0) {
    return (
      <div className="loading-message">
        <div className="portal-spinner" />
        <p>Accessing your favorite dimension...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-message">
        <span className="error-icon">⚠️</span>
        <p>Signal lost: {error}</p>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="empty-favorites">
        <span className="empty-icon">⭐</span>
        <h2>Your Favorite Dimension is Empty</h2>
        <p>Go to the Characters dimension and click the star icon on any character to save them here.</p>
      </div>
    )
  }

  return (
    <div className="favorites-grid">
      {data.map((char: import('../api/types').CharacterResponse) => (
        <article key={char.id} className="favorite-card">
          <div className="card-image-wrapper">
            <img src={char.image} alt={char.name} loading="lazy" />
            <span className={`status-badge ${getStatusClass(char.status)}`}>
              {char.status}
            </span>
            <button
              className="remove-fav-btn"
              onClick={() => onToggleFavorite(char.id)}
              aria-label={`Remove ${char.name} from favorites`}
              title="Remove from favorites"
            >
              ✕
            </button>
          </div>
          <div className="card-info">
            <h3 className="character-name">{char.name}</h3>
            <div className="character-details">
              <span className="detail-item">
                <strong>Species:</strong> {char.species}
              </span>
              {char.type && (
                <span className="detail-item">
                  <strong>Type:</strong> {char.type}
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
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
