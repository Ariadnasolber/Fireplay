import Image from "next/image"
import { getGameBySlug, getGameScreenshots } from "@/lib/rawg-api"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface GameDetailsProps {
  slug: string
}

export default async function GameDetails({ slug }: GameDetailsProps) {
  const game = await getGameBySlug(slug)
  const screenshots = await getGameScreenshots(slug)

  return (
    <div>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
        <Image
          src={game.background_image || "/placeholder.svg?height=400&width=800"}
          alt={game.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{game.name}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {game.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="screenshots">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {screenshots.results.map((screenshot: any) => (
                      <div key={screenshot.id} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={screenshot.image || "/placeholder.svg"}
                          alt={`${game.name} screenshot`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <Card>
                <CardContent className="pt-6">
                  {game.platforms.some((p: any) => p.platform.name.includes("PC")) ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Minimum Requirements</h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          <p>OS: Windows 10 64-bit</p>
                          <p>Processor: Intel Core i5-2500K / AMD FX-6300</p>
                          <p>Memory: 8 GB RAM</p>
                          <p>Graphics: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB</p>
                          <p>Storage: 50 GB available space</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">Recommended Requirements</h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          <p>OS: Windows 10 64-bit</p>
                          <p>Processor: Intel Core i7-4770K / AMD Ryzen 5 1500X</p>
                          <p>Memory: 16 GB RAM</p>
                          <p>Graphics: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB</p>
                          <p>Storage: 50 GB SSD space</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      Requirements information is not available for this platform.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Release Date</h3>
                  <p>{game.released || "Unknown"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</h3>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm mr-2 ${
                        game.rating >= 4 ? "bg-green-500" : game.rating >= 3 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    >
                      {game.rating.toFixed(1)}
                    </div>
                    <span>out of 5</span>
                  </div>
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
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Developers</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.developers.map((dev: any) => (
                      <Badge key={dev.id} variant="outline">
                        {dev.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Publishers</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.publishers.map((pub: any) => (
                      <Badge key={pub.id} variant="outline">
                        {pub.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.tags.slice(0, 8).map((tag: any) => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                  {game.website ? (
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      {game.website}
                    </a>
                  ) : (
                    <p>Not available</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
