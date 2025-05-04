import { Suspense } from "react"
import SearchResults from "@/components/SearchResults"
import GamesSkeleton from "@/components/GamesSkeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {query ? `Showing results for "${query}"` : "Enter a search term to find games"}
      </p>

      <Suspense fallback={<GamesSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}
