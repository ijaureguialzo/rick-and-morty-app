export interface Info {
  count: number
  pages: number
  next?: string | null
  prev?: string | null
}

export interface OriginOrLocation {
  name: string
  url: string
}

export interface CharacterResponse {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: OriginOrLocation
  location: OriginOrLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface EpisodeResponse {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface LocationResponse {
  id: number
  name: string
  type: string
  dimension: string
  url: string
  created: string
}

export type Dimension = 'characters' | 'episodes' | 'locations' | 'quotes' | 'favorites'
