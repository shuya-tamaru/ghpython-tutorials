import { getAllTutorials } from '@/lib/tutorials'
import TutorialGrid from '@/components/tutorial/TutorialGrid'

export default async function Home() {
  const tutorials = await getAllTutorials()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            GhPython Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            1日1モデリングでGrasshopper Pythonを学ぼう
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full">
              日々の練習
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
              実践的な学習
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full">
              段階的なレベルアップ
            </span>
          </div>
        </div>

        {/* Tutorial Grid */}
        <TutorialGrid tutorials={tutorials} />
      </div>
    </div>
  )
}