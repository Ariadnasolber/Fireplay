"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import CartItem from "@/components/CartItem"
import { Button } from "@/components/ui/button"
import { Loader2, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { user, loading: authLoading } = useAuth()
  const { cart, loading: cartLoading, clearCart, totalPrice } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/cart")
    }
  }, [user, authLoading, router])

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. This is a demo application, so no actual purchase was made.",
      variant: "default",
    })
    clearCart()
    router.push("/dashboard")
  }

  if (authLoading || cartLoading) {
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
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some games to your cart to get started</p>
          <Button onClick={() => router.push("/games")} className="bg-purple-600 hover:bg-purple-700">
            Browse Games
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCheckout} className="w-full bg-purple-600 hover:bg-purple-700">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
