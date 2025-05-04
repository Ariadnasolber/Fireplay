import { Suspense } from "react"
import GamesList from "@/components/GamesList"
import GamesSkeleton from "@/components/GamesSkeleton"
import GamesFilter from "@/components/GamesFilter"

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Games Catalog</h1>

      <GamesFilter />

      <Suspense fallback={<GamesSkeleton />}>
        <GamesList />
      </Suspense>
    </div>
  )
}
