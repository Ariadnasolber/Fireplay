import Link from "next/link"
import { Facebook, Twitter, Instagram, GitlabIcon as GitHub } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Fireplay</h3>
            <p className="text-zinc-400 mb-4">
              Your ultimate destination for discovering and purchasing the best video games online.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-400 hover:text-purple-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-purple-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-purple-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-purple-400">
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-zinc-400 hover:text-purple-400">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/info" className="text-zinc-400 hover:text-purple-400">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-zinc-400 hover:text-purple-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-zinc-400 hover:text-purple-400">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-zinc-400 hover:text-purple-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-zinc-400 hover:text-purple-400">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-zinc-400 hover:text-purple-400">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-zinc-400">&copy; {currentYear} Fireplay. All rights reserved.</p>
          <p className="text-sm text-zinc-500 mt-2">
            This is a demo project created with Next.js 15, React 19, and Firebase.
          </p>
        </div>
      </div>
    </footer>
  )
}
