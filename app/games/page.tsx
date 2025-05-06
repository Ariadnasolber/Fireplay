import { Suspense } from "react"
import GamesList from "@/components/GamesList"
import GamesSkeleton from "@/components/GamesSkeleton"
import GamesFilter from "@/components/GamesFilter"

export default function GamesPage({
  searchParams,
}: {
  searchParams: { ordering?: string; page?: string }
}) {
  // Get ordering and page from URL parameters
  const ordering = searchParams.ordering || "-rating"
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Games Catalog</h1>

      <GamesFilter />

      <Suspense key={`${ordering}-${page}`} fallback={<GamesSkeleton />}>
        <GamesList ordering={ordering} page={page} />
      </Suspense>
    </div>
  )
}
