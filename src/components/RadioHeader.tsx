interface RadioHeaderProps {
  title: string
}

export default function RadioHeader({ title }: RadioHeaderProps) {
  return (
    <header className="radio-header">
      {/* Antenna */}
      <div className="antenna">
        <span className="antenna-tip" />
        <span className="antenna-base" />
      </div>

      {/* Radio body */}
      <div className="radio-body">
        {/* Speaker grille */}
        <div className="speaker-grille" />

        {/* Display screen */}
        <div className="radio-display">
          <span className="frequency-label">FREQ</span>
          <span className="channel-number">{getChannelNumber(title)}</span>
          <h1 className="radio-title">INTERDIMENSIONAL RADIO</h1>
          <p className="broadcast-subtitle">{title}</p>
        </div>

        {/* Dials */}
        <div className="radio-dials">
          <span className="dial-label">TUNE</span>
          <div className="tuning-dial" />
          <span className="dial-label">VOLUME</span>
          <div className="volume-dial" />
        </div>

        {/* Power indicator */}
        <div className="power-indicator">
          <span className="power-light" />
          <span className="power-text">ON AIR</span>
        </div>
      </div>
    </header>
  )
}

function getChannelNumber(title: string): string {
  const map: Record<string, string> = {
    'TUNE INTO THE CHARACTERS BROADCAST': 'CH-01',
    'CATCH EPISODE FREQUENCIES': 'CH-02',
    'TRACK DOWN LOCATION SIGNALS': 'CH-03',
    'INTERDIMENSIONAL CABLE — RANDOM QUOTES': 'CH-04',
    'YOUR FAVORITE DIMENSION': 'CH-FV',
  }
  return map[title] || 'CH-??'
}
