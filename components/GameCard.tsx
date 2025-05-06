"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Game } from "@/lib/rawg-api"
import { useFavorites } from "@/context/FavoritesContext"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface GameCardProps {
  game: Game
  compact?: boolean
}

export default function GameCard({ game, compact = false }: GameCardProps) {
  const { user } = useAuth()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const favoriteStatus = isFavorite(game.id)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to add games to your favorites",
        variant: "destructive",
      })
      router.push(`/login?redirect=/game/${game.slug}`)
      return
    }

    setIsLoading(true)

    try {
      if (favoriteStatus) {
        await removeFromFavorites(game)
        toast({
          title: "Removed from favorites",
          description: `${game.name} has been removed from your favorites`,
          variant: "default",
        })
      } else {
        await addToFavorites(game)
        toast({
          title: "Added to favorites",
          description: `${game.name} has been added to your favorites`,
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error updating favorites:", error)
      toast({
        title: "Error",
        description: "There was an error updating your favorites. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link href={`/game/${game.slug}`}>
      <div
        className={`game-card rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all ${compact ? "h-full" : ""}`}
      >
        <div className="relative aspect-video">
          <Image
            src={game.background_image || "/placeholder.svg?height=200&width=300"}
            alt={game.name}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={handleFavoriteClick}
            disabled={isLoading}
          >
            <Heart className={`h-5 w-5 ${favoriteStatus ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{game.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  game.rating >= 4 ? "bg-green-500" : game.rating >= 3 ? "bg-yellow-500" : "bg-red-500"
                }`}
              >
                {game.rating.toFixed(1)}
              </div>
            </div>
            {game.price && <div className="font-bold text-lg">${game.price.toFixed(2)}</div>}
          </div>
        </div>
      </div>
    </Link>
  )
}
