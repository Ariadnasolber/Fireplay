const RAWG_API_KEY = "876a8141cb9b464db8d73455d92ef466"
const BASE_URL = "https://api.rawg.io/api"

export interface Game {
  id: number
  slug: string
  name: string
  released: string
  background_image: string
  rating: number
  metacritic: number
  genres: { id: number; name: string }[]
  platforms: { platform: { id: number; name: string } }[]
  price?: number
  quantity?: number
}

export interface GameDetails extends Game {
  description_raw: string
  description: string
  website: string
  developers: { id: number; name: string }[]
  publishers: { id: number; name: string }[]
  esrb_rating: { id: number; name: string } | null
  screenshots: { id: number; image: string }[]
  tags: { id: number; name: string }[]
  stores: { store: { id: number; name: string } }[]
}

export async function getGames(page = 1, pageSize = 20, ordering = "-rating") {
  const response = await fetch(
    `${BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}&ordering=${ordering}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch games")
  }

  const data = await response.json()

  // Add a random price to each game for the store simulation
  const gamesWithPrices = data.results.map((game: Game) => ({
    ...game,
    price: Number.parseFloat((Math.random() * 50 + 9.99).toFixed(2)),
  }))

  return {
    results: gamesWithPrices,
    count: data.count,
    next: data.next,
    previous: data.previous,
  }
}

export async function searchGames(query: string, page = 1, pageSize = 20) {
  const response = await fetch(
    `${BASE_URL}/games?key=${RAWG_API_KEY}&search=${query}&page=${page}&page_size=${pageSize}`,
  )

  if (!response.ok) {
    throw new Error("Failed to search games")
  }

  const data = await response.json()

  // Add a random price to each game for the store simulation
  const gamesWithPrices = data.results.map((game: Game) => ({
    ...game,
    price: Number.parseFloat((Math.random() * 50 + 9.99).toFixed(2)),
  }))

  return {
    results: gamesWithPrices,
    count: data.count,
    next: data.next,
    previous: data.previous,
  }
}

export async function getGameBySlug(slug: string) {
  const response = await fetch(`${BASE_URL}/games/${slug}?key=${RAWG_API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch game details")
  }

  const data = await response.json()

  // Add a random price for the store simulation
  return {
    ...data,
    price: Number.parseFloat((Math.random() * 50 + 9.99).toFixed(2)),
  }
}

export async function getGameScreenshots(slug: string) {
  const response = await fetch(`${BASE_URL}/games/${slug}/screenshots?key=${RAWG_API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch game screenshots")
  }

  return await response.json()
}
