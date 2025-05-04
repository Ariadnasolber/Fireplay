"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import type { Game } from "@/lib/rawg-api"

interface CartItemProps {
  item: Game & { quantity: number }
}

export default function CartItem({ item }: CartItemProps) {
  const { updateCartItemQuantity, removeFromCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return

    setLoading(true)
    try {
      await updateCartItemQuantity(item.id, newQuantity)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading(true)
    try {
      await removeFromCart(item.id)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center border rounded-lg p-4 bg-card">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 relative mb-4 sm:mb-0 sm:mr-4">
        <Image
          src={item.background_image || "/placeholder.svg?height=100&width=100"}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="flex-grow">
        <Link href={`/game/${item.slug}`} className="font-bold hover:text-purple-600">
          {item.name}
        </Link>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">${item.price?.toFixed(2)} each</div>
      </div>

      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center mr-6">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1 || loading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-2 w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-right">
          <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 p-0 h-auto"
            onClick={handleRemove}
            disabled={loading}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
