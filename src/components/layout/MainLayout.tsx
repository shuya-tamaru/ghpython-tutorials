'use client'

import { useState } from 'react'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import RightSidebar, { type ViewMode } from './RightSidebar'
import { type TutorialTag } from '@/lib/tags'
import { HiMenu, HiAdjustments } from 'react-icons/hi'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [selectedTags, setSelectedTags] = useState<TutorialTag[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid-2')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  const handleTagToggle = (tag: TutorialTag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Header />
      
      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 md:hidden">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setLeftSidebarOpen(true)}
            className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400"
          >
            <HiMenu className="w-6 h-6" />
            <span className="text-xs mt-1">フィルター</span>
          </button>
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400"
          >
            <HiAdjustments className="w-6 h-6" />
            <span className="text-xs mt-1">設定</span>
          </button>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <LeftSidebar
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          isOpen={leftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 md:ml-64 md:mr-64 min-h-[calc(100vh-4rem)] pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          difficultyFilter={difficultyFilter}
          onDifficultyFilterChange={setDifficultyFilter}
          isOpen={rightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
        />
      </div>
    </div>
  )
}