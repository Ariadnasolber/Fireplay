"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "./AuthContext"
import type { Game } from "@/lib/rawg-api"

interface FavoritesContextType {
  favorites: Game[]
  loading: boolean
  addToFavorites: (game: Game) => Promise<void>
  removeFromFavorites: (game: Game) => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  loading: true,
  addToFavorites: async () => {},
  removeFromFavorites: async () => {},
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([])
        setLoading(false)
        return
      }

      try {
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          setFavorites(userData.favorites || [])
        } else {
          setFavorites([])
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  const addToFavorites = async (game: Game) => {
    if (!user) return

    try {
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, {
        favorites: arrayUnion(game),
      })
      setFavorites((prev) => [...prev, game])
    } catch (error) {
      console.error("Error adding to favorites:", error)
      throw error
    }
  }

  const removeFromFavorites = async (game: Game) => {
    if (!user) return

    try {
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, {
        favorites: arrayRemove(game),
      })
      setFavorites((prev) => prev.filter((item) => item.id !== game.id))
    } catch (error) {
      console.error("Error removing from favorites:", error)
      throw error
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
