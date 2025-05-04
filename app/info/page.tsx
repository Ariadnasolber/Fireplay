import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Fireplay</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Learn about the Fireplay project and its goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Fireplay is a modern web application that simulates an online video game store. It was developed as a
              final project to demonstrate proficiency in modern web development technologies.
            </p>
            <p className="mb-4">
              The application showcases the integration of Next.js 15, React 19, Tailwind CSS 4, and Firebase to create
              a responsive, user-friendly, and feature-rich gaming platform.
            </p>
            <p>
              While Fireplay is a simulation and doesn't process real payments, it demonstrates all the core
              functionality of an e-commerce platform, including user authentication, product browsing, favorites,
              shopping cart, and more.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies Used</CardTitle>
            <CardDescription>The modern tech stack powering Fireplay</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                Next.js 15 with App Router and Server Components
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                React 19 for building the user interface
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                Tailwind CSS 4 for responsive styling
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                Firebase Authentication for user management
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                Firestore for database functionality
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                RAWG API for video game data
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-2">•</span>
                Progressive Web App (PWA) capabilities
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Project Objectives</CardTitle>
          <CardDescription>The goals and learning outcomes of the Fireplay project</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex">
              <span className="font-semibold mr-2">1.</span>
              <div>
                <p className="font-medium">Master Modern Web Technologies</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Gain proficiency in Next.js 15, React 19, and Tailwind CSS 4
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">2.</span>
              <div>
                <p className="font-medium">Implement Authentication and Database</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Integrate Firebase for user management and data persistence
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">3.</span>
              <div>
                <p className="font-medium">Create Responsive UI/UX</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Design a user-friendly interface that works across all devices
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">4.</span>
              <div>
                <p className="font-medium">Build a Progressive Web App</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Implement PWA features for offline access and installation
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">5.</span>
              <div>
                <p className="font-medium">Integrate External APIs</p>
                <p className="text-gray-600 dark:text-gray-400">Fetch and display data from the RAWG video game API</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
