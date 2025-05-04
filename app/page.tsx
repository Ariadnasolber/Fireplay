import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, GamepadIcon as GameController, ShieldCheck, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Gaming background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-purple-500">Fireplay</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Your ultimate destination for discovering and purchasing the best video games online
          </p>
          <Link href="/games">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Explore Games <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Fireplay Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What is <span className="text-purple-600">Fireplay</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                Fireplay is a modern gaming marketplace built with Next.js 15, React 19, and Firebase. We provide a
                seamless experience for gamers to discover, explore, and purchase their favorite titles.
              </p>
              <p className="text-lg mb-6">
                With our extensive catalog powered by the RAWG API, you'll find detailed information about thousands of
                games, including screenshots, descriptions, ratings, and system requirements.
              </p>
              <div className="flex gap-4">
                <Link href="/games">
                  <Button variant="outline">Browse Games</Button>
                </Link>
                <Link href="/info">
                  <Button variant="link">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-image.png"
                alt="Gaming setup"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How Fireplay Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <GameController className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Discover Games</h3>
              <p>Browse our extensive catalog of games from various platforms and genres.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Save Favorites</h3>
              <p>Create your personalized collection by saving your favorite games.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Secure Purchase</h3>
              <p>Add games to your cart and complete your purchase with our secure checkout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Gaming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Fireplay today and discover your next favorite game from our extensive collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link href="/games">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Explore Games
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
