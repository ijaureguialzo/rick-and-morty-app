import { useState, useCallback } from 'react'

const QUOTES = [
  "Wubba Lubba Dub Dub!",
  "I'm Smart Morty. I'm the Morty that doesn't screw things up.",
  "Get to da choppa!",
  "I didn't know I was special. I just thought everyone was.",
  "Somewhere out there is an Earth where I'm not a screw-up. Maybe that's my Earth, and I just don't know it yet.",
  "Rise and shine, Mr. Meeseeks! Look at me!",
  "I'm sorry, I'm so sorry. I just... I can't stop thinking about how much I hate myself.",
  "The first rule of science is: science is wrong. It takes a fool to discover something new.",
  "I invented my own dimension-cycling device, and then I just kind of fell into it.",
  "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
  "I'm a monster now, Morty! A big dumb monster!",
  "Pickle Rick! Yeah, you better not know my name is Rick.",
  "Get out of my house, Morty! Get out of my house!",
  "I'm about to do something very difficult, Morty. I'm gonna try to... interact with a girl.",
  "The government is a bunch of corrupt old men who are all secretly evil!",
  "I'm the family. I'm the father. And I will protect this family.",
  "You think the only thing that makes you special is your intelligence? That's sad, Morty.",
  "I have to sacrifice my happiness for the greater good. That's what heroes do, Morty.",
  "This is a whole new world, Morty. A whole new world of... science!",
  "I'm not a screw-up, Morty. I'm just... different.",
]

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const generateQuote = useCallback(() => {
    setGenerating(true)
    // Simulate static/noise effect
    let count = 0
    const interval = setInterval(() => {
      setQuote(`[${Math.random().toString(36).slice(2, 8).toUpperCase()}]`)
      count++
      if (count >= 15) {
        clearInterval(interval)
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
        setQuote(randomQuote)
        setGenerating(false)
      }
    }, 80)
  }, [])

  return (
    <div className="quote-generator">
      <div className="ic-logo">📺</div>
      <h2 className="quote-title">Interdimensional Cable</h2>
      <p className="quote-subtitle">Tune in for random quotes from across the multiverse</p>

      <div className="quote-display">
        {generating ? (
          <div className="static-text">
            {quote}
            <span className="static-noise" />
          </div>
        ) : quote ? (
          <blockquote className="quote-text">"{quote}"</blockquote>
        ) : (
          <p className="quote-placeholder">Press the button to tune into Interdimensional Cable</p>
        )}
      </div>

      <button className="quote-btn" onClick={generateQuote} disabled={generating}>
        {generating ? 'TUNING...' : '📡 TUNE INTO I.C.'}
      </button>
    </div>
  )
}
