import { getGames } from "@/lib/rawg-api"
import GameCard from "@/components/GameCard"
import { Button } from "@/components/ui/button"

interface GamesListProps {
  page?: number
  pageSize?: number
  ordering?: string
}

export default async function GamesList({ page = 1, pageSize = 20, ordering = "-rating" }: GamesListProps) {
  const { results: games, next, previous } = await getGames(page, pageSize, ordering)

  const nextPage = next ? page + 1 : null
  const prevPage = previous ? page - 1 : null

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        {prevPage ? (
          <Button variant="outline" href={`/games?page=${prevPage}`}>
            Previous Page
          </Button>
        ) : (
          <div></div>
        )}

        {nextPage && (
          <Button variant="outline" href={`/games?page=${nextPage}`}>
            Next Page
          </Button>
        )}
      </div>
    </div>
  )
}
