import { getAllTutorials } from '@/lib/tutorials'

export default async function TestTutorialsPage() {
  const tutorials = await getAllTutorials()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tutorial Data Test</h1>
      
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Found {tutorials.length} tutorials
        </p>
      </div>

      <div className="space-y-6">
        {tutorials.map((tutorial) => (
          <div 
            key={tutorial.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tutorial.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tutorial.day} • ID: {tutorial.id} • Slug: {tutorial.slug}
                </p>
              </div>
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index < Math.floor(tutorial.difficulty) ? '★' : '☆'}
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  ({tutorial.difficulty})
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {tutorial.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Thumbnail: {tutorial.thumbnailPath}</p>
              <p>Content length: {tutorial.content.length} characters</p>
              <p>HTML content length: {tutorial.htmlContent.length} characters</p>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Raw Content
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-auto max-h-40">
                {tutorial.content}
              </pre>
            </details>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                Show HTML Content
              </summary>
              <div 
                className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-sm overflow-auto max-h-40"
                dangerouslySetInnerHTML={{ __html: tutorial.htmlContent }}
              />
            </details>
          </div>
        ))}
      </div>

      {tutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No tutorials found. Check if the markdown files exist in src/content/tutorials/
          </p>
        </div>
      )}
    </div>
  )
}