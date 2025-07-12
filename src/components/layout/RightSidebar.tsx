'use client'

import { useState } from 'react'
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa'
import { MdViewModule, MdViewList } from 'react-icons/md'

export type ViewMode = 'grid-2' | 'grid-4'

interface RightSidebarProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  difficultyFilter: number | null
  onDifficultyFilterChange: (difficulty: number | null) => void
  isOpen: boolean
  onClose: () => void
}

export default function RightSidebar({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyFilterChange,
  isOpen,
  onClose
}: RightSidebarProps) {
  const difficulties = [1, 2, 3, 4, 5]

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
        fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 
        border-l border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300
        md:translate-x-0 md:static md:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              表示設定
            </h2>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaSearch className="inline w-4 h-4 mr-2" />
              検索
            </label>
            <input
              type="text"
              placeholder="チュートリアルを検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* View Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MdViewModule className="inline w-4 h-4 mr-2" />
              表示形式
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => onViewModeChange('grid-2')}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${viewMode === 'grid-2'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <MdViewList className="inline w-4 h-4 mr-1" />
                2列
              </button>
              <button
                onClick={() => onViewModeChange('grid-4')}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${viewMode === 'grid-4'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <MdViewModule className="inline w-4 h-4 mr-1" />
                4列
              </button>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaFilter className="inline w-4 h-4 mr-2" />
              難易度フィルター
            </label>
            <div className="space-y-2">
              <button
                onClick={() => onDifficultyFilterChange(null)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                  ${difficultyFilter === null
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                すべて表示
              </button>
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyFilterChange(difficulty)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center
                    ${difficultyFilter === difficulty
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={`w-3 h-3 mr-1 ${
                          index < difficulty
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2">難易度 {difficulty}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>表示形式: {viewMode === 'grid-2' ? '2列グリッド' : '4列グリッド'}</p>
              {difficultyFilter && (
                <p>難易度フィルター: ★{difficultyFilter}</p>
              )}
              {searchQuery && (
                <p>検索中: "{searchQuery}"</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}