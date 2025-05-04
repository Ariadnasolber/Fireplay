import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductSheetSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <div className="md:w-1/3">
        <div className="sticky top-24">
          <Skeleton className="aspect-square rounded-lg mb-4" />

          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-10 w-full mb-4" />

              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-5 w-32" />
                </div>

                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>

                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="md:w-2/3">
        <Skeleton className="h-10 w-3/4 mb-4" />

        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-10 rounded-full mr-2" />
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 mx-0.5" />
            ))}
            <Skeleton className="h-5 w-24 ml-2" />
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
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
