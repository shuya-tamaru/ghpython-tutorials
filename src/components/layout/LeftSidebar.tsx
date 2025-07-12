'use client'

import { useState } from 'react'
import { TUTORIAL_TAGS, TAG_COLORS, type TutorialTag } from '@/lib/tags'

interface LeftSidebarProps {
  selectedTags: TutorialTag[]
  onTagToggle: (tag: TutorialTag) => void
  isOpen: boolean
  onClose: () => void
}

export default function LeftSidebar({ 
  selectedTags, 
  onTagToggle, 
  isOpen, 
  onClose 
}: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTags = TUTORIAL_TAGS.filter(tag =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
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
        md:translate-x-0 md:static md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              タグフィルター
            </h2>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="タグを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Clear All Button */}
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllTags}
              className="mb-4 px-3 py-1 text-sm text-red-600 hover:text-red-700 
                       dark:text-red-400 dark:hover:text-red-300 
                       border border-red-300 dark:border-red-600 rounded-lg
                       hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              すべて解除 ({selectedTags.length})
            </button>
          )}

          {/* Tags List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {filteredTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isSelected 
                        ? `${TAG_COLORS[tag]} ring-2 ring-primary/50` 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    <span className="capitalize">{tag}</span>
                  </button>
                )
              })}
            </div>

            {filteredTags.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                該当するタグが見つかりません
              </p>
            )}
          </div>

          {/* Statistics */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              選択中: {selectedTags.length} / {TUTORIAL_TAGS.length}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}