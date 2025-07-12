import { getAllTutorials } from '@/lib/tutorials'
import TutorialGrid from '@/components/tutorial/TutorialGrid'

export default async function Home() {
  const tutorials = await getAllTutorials()

  return (
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
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
            日々の練習
          </span>
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full">
            実践的な学習
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            段階的なレベルアップ
          </span>
        </div>
      </div>

      {/* Tutorial Grid */}
      <TutorialGrid tutorials={tutorials} />
    </div>
  )
}