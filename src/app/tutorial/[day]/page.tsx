import { notFound } from 'next/navigation'
import { getAllTutorials, getTutorialBySlug, getNextTutorial, getPrevTutorial } from '@/lib/tutorials'
import TutorialContent from '@/components/tutorial/TutorialContent'
import TutorialImage from '@/components/ui/TutorialImage'
import DifficultyStars from '@/components/ui/DifficultyStars'

interface TutorialPageProps {
  params: {
    day: string
  }
}

export async function generateStaticParams() {
  const tutorials = await getAllTutorials()
  return tutorials.map((tutorial) => ({
    day: tutorial.slug,
  }))
}

export async function generateMetadata({ params }: TutorialPageProps) {
  const tutorial = await getTutorialBySlug(params.day)
  
  if (!tutorial) {
    return {
      title: 'Tutorial Not Found',
    }
  }

  return {
    title: `${tutorial.title} | GhPython Tutorials`,
    description: `${tutorial.day}: ${tutorial.title} - Learn Grasshopper Python with this tutorial`,
  }
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = await getTutorialBySlug(params.day)

  if (!tutorial) {
    notFound()
  }

  const nextTutorial = await getNextTutorial(params.day)
  const prevTutorial = await getPrevTutorial(params.day)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {tutorial.day}
            </span>
            <DifficultyStars difficulty={tutorial.difficulty} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {tutorial.title}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {tutorial.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        <div className="mb-8">
          <div className="aspect-video rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
            <TutorialImage
              src={tutorial.thumbnailPath}
              alt={`${tutorial.title}のサムネイル`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <TutorialContent content={tutorial.content} />
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              {prevTutorial && (
                <a
                  href={`/tutorial/${prevTutorial.slug}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 
                           hover:text-primary dark:hover:text-primary transition-colors"
                >
                  ← {prevTutorial.day}
                </a>
              )}
            </div>
            
            <div>
              {nextTutorial && (
                <a
                  href={`/tutorial/${nextTutorial.slug}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 
                           hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {nextTutorial.day} →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}