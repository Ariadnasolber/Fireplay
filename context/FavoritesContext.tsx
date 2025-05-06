"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "./AuthContext"
import type { Game } from "@/lib/rawg-api"
import { useToast } from "@/components/ui/use-toast"

interface FavoritesContextType {
  favorites: Game[]
  loading: boolean
  addToFavorites: (game: Game) => Promise<void>
  removeFromFavorites: (game: Game) => Promise<void>
  isFavorite: (gameId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  loading: true,
  addToFavorites: async () => {},
  removeFromFavorites: async () => {},
  isFavorite: () => false,
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          setFavorites(userData.favorites || [])
        } else {
          // Create user document if it doesn't exist
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            createdAt: new Date().toISOString(),
            favorites: [],
            cart: [],
          })
          setFavorites([])
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
        toast({
          title: "Error",
          description: "Failed to load favorites. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, toast])

  const isFavorite = (gameId: number) => {
    return favorites.some((game) => game.id === gameId)
  }

  const addToFavorites = async (game: Game) => {
    if (!user) return

    try {
      // First update local state for immediate UI feedback
      setFavorites((prev) => [...prev, game])

      // Then update Firestore
      const userDocRef = doc(db, "users", user.uid)

      // Check if document exists first
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(game),
        })
      } else {
        // Create the document if it doesn't exist
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
          favorites: [game],
          cart: [],
        })
      }

      console.log("Successfully added to favorites:", game.name)
    } catch (error) {
      console.error("Error adding to favorites:", error)
      // Revert local state change on error
      setFavorites((prev) => prev.filter((item) => item.id !== game.id))
      throw error
    }
  }

  const removeFromFavorites = async (game: Game) => {
    if (!user) return

    try {
      // First update local state for immediate UI feedback
      setFavorites((prev) => prev.filter((item) => item.id !== game.id))

      // Then update Firestore
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, {
        favorites: arrayRemove(game),
      })

      console.log("Successfully removed from favorites:", game.name)
    } catch (error) {
      console.error("Error removing from favorites:", error)
      // Revert local state change on error
      setFavorites((prev) => [...prev, game])
      throw error
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
