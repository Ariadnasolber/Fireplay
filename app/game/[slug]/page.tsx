import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import GameDetails from "@/components/GameDetails"
import GameDetailsSkeleton from "@/components/GameDetailsSkeleton"

export default function GamePage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<GameDetailsSkeleton />}>
        <GameDetails slug={params.slug} />
      </Suspense>

      <div className="mt-8">
        <Link href={`/product-sheet/${params.slug}`}>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Product Sheet
          </Button>
        </Link>
      </div>
    </div>
  )
}
