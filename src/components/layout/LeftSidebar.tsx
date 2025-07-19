'use client'

import { usePathname } from 'next/navigation'
import { HiOutlineStar } from 'react-icons/hi'
import { IoIosSearch } from 'react-icons/io'
import { IoPricetagOutline } from 'react-icons/io5'
import { MdOutlineCalendarToday } from 'react-icons/md'

interface LeftSidebarProps {
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  difficultyFilter: number | null
  onDifficultyFilterChange: (difficulty: number | null) => void
  dayFilter: number | null
  onDayFilterChange: (day: number | null) => void
  maxDay: number
  isOpen: boolean
  onClose: () => void
  availableTags: string[]
  totalTutorialsCount: number
}

export default function LeftSidebar({ 
  selectedTags, 
  onTagToggle,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyFilterChange,
  dayFilter,
  onDayFilterChange,
  maxDay,
  isOpen, 
  onClose,
  availableTags,
  totalTutorialsCount
}: LeftSidebarProps) {
  const pathname = usePathname()
  
  // チュートリアル詳細ページかどうかを判定
  const isTutorialDetailPage = pathname?.startsWith('/tutorial/') && pathname !== '/tutorial'

  const handleTagClick = (tag: string) => {
    onTagToggle(tag)
  }

  const clearAllTags = () => {
    selectedTags.forEach(tag => onTagToggle(tag))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-50 transform transition-transform duration-300
        md:sticky md:top-8 md:h-[calc(100vh-2rem)] md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isTutorialDetailPage 
          ? 'bg-[#F8F9FA] dark:bg-gray-900' 
          : 'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700'
        }
      `}>
        <div className={`p-4 h-full flex flex-col overflow-y-auto ${isTutorialDetailPage ? 'opacity-0 pointer-events-none' : ''}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tutorials: {totalTutorialsCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Title Search */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <IoIosSearch className="w-6 h-6 text-red-500" />
              <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                Search
              </span>
            </div>
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Day Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MdOutlineCalendarToday className="w-6 h-6 text-blue-500" />
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Day
                </span>
              </div>
              {dayFilter !== null && (
                <button
                  onClick={() => onDayFilterChange(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                           px-2 py-1 rounded-md bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 
                           border border-red-200 dark:border-red-800 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max={maxDay}
                step="1"
                value={dayFilter || 0}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  onDayFilterChange(value === 0 ? null : value);
                }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                         slider:bg-blue-500 slider:h-2 slider:rounded-lg slider:cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((dayFilter || 0) / maxDay) * 100}%, #e5e7eb ${((dayFilter || 0) / maxDay) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>All</span>
                <span>Day {Math.ceil(maxDay * 0.25)}</span>
                <span>Day {Math.ceil(maxDay * 0.5)}</span>
                <span>Day {Math.ceil(maxDay * 0.75)}</span>
                <span>Day {maxDay}</span>
              </div>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <HiOutlineStar className="w-6 h-6 text-yellow-500" />
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Difficulty
                </span>
              </div>
              {difficultyFilter !== null && (
                <button
                  onClick={() => onDifficultyFilterChange(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                           px-2 py-1 rounded-md bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 
                           border border-red-200 dark:border-red-800 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="7"
                step="0.5"
                value={difficultyFilter || 0}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  onDifficultyFilterChange(value === 0 ? null : value);
                }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                         slider:bg-secondary slider:h-2 slider:rounded-lg slider:cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #3776AB 0%, #3776AB ${((difficultyFilter || 0) / 7) * 100}%, #e5e7eb ${((difficultyFilter || 0) / 7) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>All</span>
                <span>★1</span>
                <span>★2</span>
                <span>★3</span>
                <span>★4</span>
                <span>★5</span>
                <span>★6</span>
                <span>★7</span>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <IoPricetagOutline className="w-6 h-6 text-green-500" />
              <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                Tags ({selectedTags.length}/{availableTags.length})
              </span>
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                         px-2 py-1 rounded-md bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 
                         border border-red-200 dark:border-red-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tags Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 
                      border border-transparent hover:scale-105 active:scale-95
                      ${isSelected 
                        ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                  >
                    <span className="capitalize">#{tag}</span>
                  </button>
                )
              })}
            </div>

          </div>
        </div>
      </aside>
    </>
  )
}