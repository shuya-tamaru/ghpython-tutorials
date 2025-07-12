import Link from 'next/link'
import DifficultyStars from './DifficultyStars'
import TutorialImage from './TutorialImage'
import { TAG_COLORS } from '@/lib/tags'
import { type Tutorial } from '@/types/tutorial'

interface TutorialCardProps {
  tutorial: Tutorial
  viewMode?: 'grid-2' | 'grid-4'
}

export default function TutorialCard({ tutorial, viewMode = 'grid-2' }: TutorialCardProps) {
  const isCompact = viewMode === 'grid-4'

  return (
    <Link 
      href={`/tutorial/${tutorial.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 
               hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-200 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className={`relative ${isCompact ? 'aspect-video' : 'aspect-[4/3]'}`}>
        <TutorialImage
          src={tutorial.thumbnailPath}
          alt={`${tutorial.title}のサムネイル`}
          fill
          sizes={isCompact ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" : "(max-width: 768px) 100vw, 50vw"}
          className="w-full h-full"
        />
        
        {/* Day badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
            {tutorial.day}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${isCompact ? 'p-3' : 'p-4'}`}>
        <h3 className={`font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary 
                       dark:group-hover:text-primary transition-colors ${isCompact ? 'text-sm' : 'text-lg'}`}>
          {tutorial.title}
        </h3>

        {!isCompact && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            GhPythonでの{tutorial.title}の実装方法を学びます。
          </p>
        )}

        {/* Tags */}
        <div className={`flex flex-wrap gap-1 mb-3 ${isCompact ? 'mb-2' : 'mb-3'}`}>
          {tutorial.tags.slice(0, isCompact ? 2 : 4).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs font-medium rounded ${TAG_COLORS[tag]}`}
            >
              {tag}
            </span>
          ))}
          {tutorial.tags.length > (isCompact ? 2 : 4) && (
            <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{tutorial.tags.length - (isCompact ? 2 : 4)}
            </span>
          )}
        </div>

        {/* Difficulty */}
        <div className="flex items-center justify-between">
          <DifficultyStars 
            difficulty={tutorial.difficulty} 
            size={isCompact ? 'sm' : 'md'}
            showNumber={!isCompact}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            詳細を見る →
          </span>
        </div>
      </div>
    </Link>
  )
}