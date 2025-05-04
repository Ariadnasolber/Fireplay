"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "./AuthContext"
import type { Game } from "@/lib/rawg-api"

interface CartItem extends Game {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  loading: boolean
  totalPrice: number
  addToCart: (game: CartItem) => Promise<void>
  updateCartItemQuantity: (gameId: number, quantity: number) => Promise<void>
  removeFromCart: (gameId: number) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType>({
  cart: [],
  loading: true,
  totalPrice: 0,
  addToCart: async () => {},
  updateCartItemQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)

  // Calculate total price whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)
  }, [cart])

  // Load cart from Firestore or localStorage
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)

      try {
        if (user) {
          // Fetch cart from Firestore
          const userDocRef = doc(db, "users", user.uid)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            const userData = userDoc.data()
            setCart(userData.cart || [])
          } else {
            setCart([])
          }
        } else {
          // Fetch cart from localStorage
          const storedCart = localStorage.getItem("cart")
          if (storedCart) {
            setCart(JSON.parse(storedCart))
          } else {
            setCart([])
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
        setCart([])
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [user])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!loading) {
      if (!user) {
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    }
  }, [cart, loading, user])

  const saveCartToFirestore = async (newCart: CartItem[]) => {
    if (!user) return

    try {
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, { cart: newCart })
    } catch (error) {
      console.error("Error saving cart to Firestore:", error)
      throw error
    }
  }

  const addToCart = async (game: CartItem) => {
    const existingItemIndex = cart.findIndex((item) => item.id === game.id)

    let newCart: CartItem[]

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      newCart = [...cart]
      newCart[existingItemIndex].quantity += game.quantity
    } else {
      // Add new item
      newCart = [...cart, game]
    }

    setCart(newCart)

    if (user) {
      await saveCartToFirestore(newCart)
    }
  }

  const updateCartItemQuantity = async (gameId: number, quantity: number) => {
    const newCart = cart.map((item) => (item.id === gameId ? { ...item, quantity } : item))

    setCart(newCart)

    if (user) {
      await saveCartToFirestore(newCart)
    }
  }

  const removeFromCart = async (gameId: number) => {
    const newCart = cart.filter((item) => item.id !== gameId)

    setCart(newCart)

    if (user) {
      await saveCartToFirestore(newCart)
    }
  }

  const clearCart = async () => {
    setCart([])

    if (user) {
      await saveCartToFirestore([])
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        totalPrice,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
