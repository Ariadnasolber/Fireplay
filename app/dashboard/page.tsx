"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useFavorites } from "@/context/FavoritesContext"
import { useCart } from "@/context/CartContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Heart, ShoppingCart, MessageSquare, User } from "lucide-react"
import GameCard from "@/components/GameCard"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useState } from "react"

interface Message {
  id: string
  message: string
  createdAt: any
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { favorites, loading: favoritesLoading } = useFavorites()
  const { cart, loading: cartLoading } = useCart()
  const [messages, setMessages] = useState<Message[]>([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return

      try {
        const q = query(collection(db, "messages"), where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)

        const messagesData: Message[] = []
        querySnapshot.forEach((doc) => {
          messagesData.push({
            id: doc.id,
            ...doc.data(),
          } as Message)
        })

        setMessages(messagesData)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setMessagesLoading(false)
      }
    }

    if (user) {
      fetchMessages()
    }
  }, [user])

  if (authLoading || favoritesLoading || cartLoading || messagesLoading) {
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
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Games in your favorites list</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cart.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Games in your shopping cart</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Messages sent to support</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">{user.displayName}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="favorites">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="cart">Cart</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorite Games</CardTitle>
                  <CardDescription>Games you've marked as favorites</CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You haven't added any games to your favorites yet
                      </p>
                      <Link href="/games">
                        <Button className="bg-purple-600 hover:bg-purple-700">Browse Games</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {favorites.slice(0, 6).map((game) => (
                        <GameCard key={game.id} game={game} compact />
                      ))}
                    </div>
                  )}

                  {favorites.length > 6 && (
                    <div className="text-center mt-4">
                      <Link href="/favorites">
                        <Button variant="outline">View All Favorites</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cart">
              <Card>
                <CardHeader>
                  <CardTitle>Your Shopping Cart</CardTitle>
                  <CardDescription>Games in your cart</CardDescription>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
                      <Link href="/games">
                        <Button className="bg-purple-600 hover:bg-purple-700">Browse Games</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 relative mr-4">
                              <Image
                                src={item.background_image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}

                      <div className="text-center mt-4">
                        <Link href="/cart">
                          <Button className="bg-purple-600 hover:bg-purple-700">View Cart</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Your Messages</CardTitle>
                  <CardDescription>Messages you've sent to our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't sent any messages yet</p>
                      <Link href="/contact">
                        <Button className="bg-purple-600 hover:bg-purple-700">Contact Us</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <Card key={message.id}>
                          <CardContent className="pt-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {new Date(message.createdAt?.toDate()).toLocaleDateString()}
                            </p>
                            <p>{message.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
