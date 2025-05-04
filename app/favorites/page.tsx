"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useFavorites } from "@/context/FavoritesContext"
import GameCard from "@/components/GameCard"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth()
  const { favorites, loading: favoritesLoading } = useFavorites()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/favorites")
    }
  }, [user, authLoading, router])

  if (authLoading || favoritesLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start adding games to your favorites to see them here</p>
          <Button onClick={() => router.push("/games")} className="bg-purple-600 hover:bg-purple-700">
            Browse Games
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
