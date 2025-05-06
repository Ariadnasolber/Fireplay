"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GamesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentOrdering = searchParams.get("ordering") || "-rating"
  const currentPage = searchParams.get("page") || "1"

  const handleOrderingChange = (value: string) => {
    const params = new URLSearchParams()
    params.set("ordering", value)
    // Preserve the current page if it exists
    if (currentPage !== "1") {
      params.set("page", currentPage)
    }
    router.push(`/games?${params.toString()}`)
  }

  // Map ordering values to display names
  const getOrderingDisplayName = (value: string) => {
    switch (value) {
      case "-rating":
        return "Rating (High to Low)"
      case "rating":
        return "Rating (Low to High)"
      case "-released":
        return "Release Date (Newest)"
      case "released":
        return "Release Date (Oldest)"
      case "name":
        return "Name (A-Z)"
      case "-name":
        return "Name (Z-A)"
      default:
        return "Rating (High to Low)"
    }
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium">Filter Games</h2>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
        <Select value={currentOrdering} onValueChange={handleOrderingChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={getOrderingDisplayName(currentOrdering)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-rating">Rating (High to Low)</SelectItem>
            <SelectItem value="rating">Rating (Low to High)</SelectItem>
            <SelectItem value="-released">Release Date (Newest)</SelectItem>
            <SelectItem value="released">Release Date (Oldest)</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="-name">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
