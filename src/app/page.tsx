export default function Home() {
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

      {/* Tutorial Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                Day {index + 1} サムネイル
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              チュートリアル {index + 1}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              GhPythonの基本的な使い方を学ぶチュートリアルです。
            </p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded">
                  array
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded">
                  grid
                </span>
              </div>
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex}>
                    {starIndex < (index + 1) ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}