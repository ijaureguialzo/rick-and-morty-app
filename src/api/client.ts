const BASE_URL = 'https://rickandmortyapi.com/api'

export async function fetchCharacters(page: number = 1) {
  const res = await fetch(`${BASE_URL}/character?page=${page}`)
  if (!res.ok) throw new Error('Failed to fetch characters')
  return res.json() as Promise<{ results: import('./types').CharacterResponse[]; info: import('./types').Info }>
}

export async function fetchEpisodes(page: number = 1) {
  const res = await fetch(`${BASE_URL}/episode?page=${page}`)
  if (!res.ok) throw new Error('Failed to fetch episodes')
  return res.json() as Promise<{ results: import('./types').EpisodeResponse[]; info: import('./types').Info }>
}

export async function fetchLocations(page: number = 1) {
  const res = await fetch(`${BASE_URL}/location?page=${page}`)
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json() as Promise<{ results: import('./types').LocationResponse[]; info: import('./types').Info }>
}
