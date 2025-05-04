import { searchGames } from "@/lib/rawg-api"
import GameCard from "@/components/GameCard"

interface SearchResultsProps {
  query: string
}

export default async function SearchResults({ query }: SearchResultsProps) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Enter a search term</h2>
        <p className="text-gray-600 dark:text-gray-400">Use the search bar above to find games</p>
      </div>
    )
  }

  const { results: games, count } = await searchGames(query)

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No results found</h2>
        <p className="text-gray-600 dark:text-gray-400">We couldn't find any games matching "{query}"</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6">
        Found {count} results for "{query}"
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}
