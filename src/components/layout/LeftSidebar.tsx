'use client'

import { useState } from 'react'
import { TUTORIAL_TAGS, TAG_COLORS, type TutorialTag } from '@/lib/tags'

interface LeftSidebarProps {
  selectedTags: TutorialTag[]
  onTagToggle: (tag: TutorialTag) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  difficultyFilter: number | null
  onDifficultyFilterChange: (difficulty: number | null) => void
  isOpen: boolean
  onClose: () => void
}

export default function LeftSidebar({ 
  selectedTags, 
  onTagToggle,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyFilterChange,
  isOpen, 
  onClose 
}: LeftSidebarProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState('')

  const filteredTags = TUTORIAL_TAGS.filter(tag =>
    tag.toLowerCase().includes(localSearchQuery.toLowerCase())
  )

  const handleTagClick = (tag: TutorialTag) => {
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
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300
        md:translate-x-0 md:fixed md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              フィルター
            </h2>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="チュートリアルを検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Tag Search */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="タグを検索..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              タグ ({selectedTags.length}/{TUTORIAL_TAGS.length})
            </span>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                         px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                クリア
              </button>
            )}
          </div>

          {/* Tags Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => {
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
                    <span className="capitalize">{tag}</span>
                  </button>
                )
              })}
            </div>

            {filteredTags.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  該当するタグが見つかりません
                </p>
              </div>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                難易度
              </span>
              {difficultyFilter !== null && (
                <button
                  onClick={() => onDifficultyFilterChange(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                           px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  クリア
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyFilterChange(
                    difficultyFilter === difficulty ? null : difficulty
                  )}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 
                    border border-transparent hover:scale-105 active:scale-95 flex items-center gap-1
                    ${difficultyFilter === difficulty
                      ? 'bg-secondary text-white shadow-md hover:bg-secondary/90' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <span>★{difficulty}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}