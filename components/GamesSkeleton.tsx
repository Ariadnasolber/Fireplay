import { Skeleton } from "@/components/ui/skeleton"

export default function GamesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden border shadow-sm">
          <Skeleton className="aspect-video w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
