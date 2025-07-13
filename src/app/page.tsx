import { getAllTutorials, getAllTags } from '@/lib/tutorials'
import TutorialGrid from '@/components/tutorial/TutorialGrid'

export default async function Home() {
  const [tutorials, availableTags] = await Promise.all([
    getAllTutorials(),
    getAllTags()
  ])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            GhPython Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            <span className="md:hidden">
              One Model a Day<br />with Grasshopper Python
            </span>
            <span className="hidden md:inline">
              One Model a Day with Grasshopper Python
            </span>
          </p>
        </div>

        {/* Tutorial Grid */}
        <TutorialGrid tutorials={tutorials} availableTags={availableTags} />
      </div>
    </div>
  )
}