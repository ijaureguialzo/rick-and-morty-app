import type { Dimension } from '../api/types'

interface DimensionTunerProps {
  current: Dimension
  onChange: (dim: Dimension) => void
  labels: Record<Dimension, string>
}

const channels: { key: Dimension; label: string }[] = [
  { key: 'characters', label: '🧬' },
  { key: 'episodes', label: '📺' },
  { key: 'locations', label: '🗺️' },
  { key: 'quotes', label: '📡' },
  { key: 'favorites', label: '⭐' },
]

export default function DimensionTuner({ current, onChange, labels }: DimensionTunerProps) {
  return (
    <nav className="dimension-tuner" role="navigation" aria-label="Dimension selector">
      {channels.map((ch) => (
        <button
          key={ch.key}
          className={`channel-btn ${current === ch.key ? 'active' : ''}`}
          onClick={() => onChange(ch.key)}
          aria-pressed={current === ch.key}
        >
          <span className="channel-icon">{ch.label}</span>
          <span className="channel-label">{labels[ch.key]}</span>
          {current === ch.key && <span className="channel-wave" />}
        </button>
      ))}
    </nav>
  )
}
