'use client'

import { TfiLayoutGrid2Alt, TfiLayoutGrid4Alt } from 'react-icons/tfi'
import { type ViewMode } from '@/components/layout/MainLayout'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange('grid-2')}
        className={`
          p-2 rounded-md transition-all duration-200 hover:opacity-70
          ${viewMode === 'grid-2'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }
        `}
        aria-label="2列表示"
        title="2列表示"
      >
        <TfiLayoutGrid2Alt className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => onViewModeChange('grid-4')}
        className={`
          p-2 rounded-md transition-all duration-200 hover:opacity-70
          ${viewMode === 'grid-4'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }
        `}
        aria-label="4列表示"
        title="4列表示"
      >
        <TfiLayoutGrid4Alt className="w-4 h-4" />
      </button>
    </div>
  )
}