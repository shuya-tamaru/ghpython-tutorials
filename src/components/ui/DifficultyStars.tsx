import { FaStar } from 'react-icons/fa'

interface DifficultyStarsProps {
  difficulty: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

export default function DifficultyStars({ 
  difficulty, 
  size = 'md', 
  showNumber = true 
}: DifficultyStarsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar
            key={index}
            className={`${sizeClasses[size]} ${
              index < Math.floor(difficulty)
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizes[size]} text-gray-500 dark:text-gray-400 ml-1`}>
          ({difficulty})
        </span>
      )}
    </div>
  )
}