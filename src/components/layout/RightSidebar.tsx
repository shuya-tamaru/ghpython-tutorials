'use client'

import { useState } from 'react'
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa'
import { MdViewModule, MdViewList } from 'react-icons/md'

export type ViewMode = 'grid-2' | 'grid-4'

interface RightSidebarProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  isOpen: boolean
  onClose: () => void
}

export default function RightSidebar({
  viewMode,
  onViewModeChange,
  isOpen,
  onClose
}: RightSidebarProps) {

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
        md:translate-x-0 md:fixed md:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
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

          {/* View Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <MdViewModule className="inline w-4 h-4 mr-2" />
              表示形式
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => onViewModeChange('grid-2')}
                className={`
                  flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${viewMode === 'grid-2'
                    ? 'bg-primary text-white shadow-md'
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
                  flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${viewMode === 'grid-4'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <MdViewModule className="inline w-4 h-4 mr-1" />
                4列
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>表示形式: {viewMode === 'grid-2' ? '2列グリッド' : '4列グリッド'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}