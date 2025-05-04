import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-purple-600 hover:bg-purple-700">Go Home</Button>
        </Link>
        <Link href="/games">
          <Button variant="outline">Browse Games</Button>
        </Link>
      </div>
    </div>
  )
}
