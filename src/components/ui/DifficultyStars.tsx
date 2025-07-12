import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

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

  const renderStar = (index: number) => {
    const starPosition = index + 1;
    
    if (difficulty >= starPosition) {
      // 満点の星
      return (
        <FaStar
          key={index}
          className={`${sizeClasses[size]} text-yellow-400`}
        />
      );
    } else if (difficulty >= starPosition - 0.5) {
      // 半分の星
      return (
        <FaStarHalfAlt
          key={index}
          className={`${sizeClasses[size]} text-yellow-400`}
        />
      );
    } else {
      // 空の星
      return (
        <FaStar
          key={index}
          className={`${sizeClasses[size]} text-gray-300 dark:text-gray-600`}
        />
      );
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => renderStar(index))}
      </div>
      {showNumber && (
        <span className={`${textSizes[size]} text-gray-500 dark:text-gray-400 ml-1`}>
          ({difficulty})
        </span>
      )}
    </div>
  )
}