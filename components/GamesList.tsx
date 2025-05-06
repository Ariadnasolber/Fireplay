import { getGames } from "@/lib/rawg-api"
import GameCard from "@/components/GameCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GamesListProps {
  page?: number
  pageSize?: number
  ordering?: string
}

export default async function GamesList({ page = 1, pageSize = 20, ordering = "-rating" }: GamesListProps) {
  // Fetch games with the provided ordering parameter
  const { results: games, next, previous } = await getGames(page, pageSize, ordering)

  const nextPage = next ? page + 1 : null
  const prevPage = previous ? page - 1 : null

  // Calculate the correct query string for pagination links
  const getQueryString = (newPage: number) => {
    const params = new URLSearchParams()
    params.set("page", newPage.toString())
    if (ordering !== "-rating") {
      params.set("ordering", ordering)
    }
    return params.toString()
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        {prevPage ? (
          <Link href={`/games?${getQueryString(prevPage)}`}>
            <Button variant="outline">Previous Page</Button>
          </Link>
        ) : (
          <div></div>
        )}

        {nextPage && (
          <Link href={`/games?${getQueryString(nextPage)}`}>
            <Button variant="outline">Next Page</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
