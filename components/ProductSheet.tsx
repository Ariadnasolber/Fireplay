"use client"

import { useState } from "react"
import Image from "next/image"
import { getGameBySlug } from "@/lib/rawg-api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface ProductSheetProps {
  slug: string
}

export default async function ProductSheet({ slug }: ProductSheetProps) {
  const game = await getGameBySlug(slug)

  return <ProductSheetClient game={game} />
}

function ProductSheetClient({ game }: { game: any }) {
  const { user } = useAuth()
  const { cart, addToCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const isInCart = cart.some((item) => item.id === game.id)

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to add games to your cart",
        variant: "destructive",
      })
      router.push("/login?redirect=/product-sheet/" + game.slug)
      return
    }

    if (isInCart) {
      router.push("/cart")
      return
    }

    setLoading(true)

    try {
      await addToCart({
        ...game,
        quantity: 1,
      })

      toast({
        title: "Added to cart",
        description: `${game.name} has been added to your cart`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the game to your cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Generate random reviews
  const reviews = [
    {
      id: 1,
      author: "Alex Johnson",
      rating: 5,
      date: "2023-10-15",
      content:
        "This game exceeded all my expectations! The graphics are stunning, and the gameplay is incredibly immersive. Highly recommended for any gaming enthusiast.",
    },
    {
      id: 2,
      author: "Sarah Miller",
      rating: 4,
      date: "2023-09-28",
      content:
        "Really enjoyed playing this. The story is captivating, and the characters are well-developed. Only giving 4 stars because of some minor performance issues.",
    },
    {
      id: 3,
      author: "Michael Chen",
      rating: 5,
      date: "2023-11-02",
      content:
        "One of the best games I've played this year! The attention to detail is remarkable, and the soundtrack perfectly complements the gameplay.",
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={game.background_image || "/placeholder.svg?height=400&width=400"}
                alt={game.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold mb-2">${game.price.toFixed(2)}</div>

                <Button
                  className="w-full mb-4 bg-purple-600 hover:bg-purple-700"
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  {loading ? (
                    "Adding..."
                  ) : isInCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      View Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Release Date</h3>
                    <p>{game.released || "Unknown"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Platforms</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {game.platforms.map((p: any) => (
                        <Badge key={p.platform.id} variant="outline">
                          {p.platform.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Genres</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {game.genres.map((genre: any) => (
                        <Badge key={genre.id} variant="secondary">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{game.name}</h1>

          <div className="flex items-center mb-6">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm mr-2 ${
                game.rating >= 4 ? "bg-green-500" : game.rating >= 3 ? "bg-yellow-500" : "bg-red-500"
              }`}
            >
              {game.rating.toFixed(1)}
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(game.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                ({Math.floor(Math.random() * 1000) + 100} reviews)
              </span>
            </div>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{review.author}</h3>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{review.date}</div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2">Game Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Developer</span>
                          <span>{game.developers[0]?.name || "Unknown"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Publisher</span>
                          <span>{game.publishers[0]?.name || "Unknown"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Release Date</span>
                          <span>{game.released || "Unknown"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">ESRB Rating</span>
                          <span>{game.esrb_rating?.name || "Not Rated"}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">System Requirements</h3>
                      {game.platforms.some((p: any) => p.platform.name.includes("PC")) ? (
                        <div className="text-gray-600 dark:text-gray-400 space-y-2">
                          <p>OS: Windows 10 64-bit</p>
                          <p>Processor: Intel Core i5-2500K / AMD FX-6300</p>
                          <p>Memory: 8 GB RAM</p>
                          <p>Graphics: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB</p>
                          <p>Storage: 50 GB available space</p>
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          Requirements information is not available for this platform.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
