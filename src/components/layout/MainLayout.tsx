'use client'

import { useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import MobileDrawer from './MobileDrawer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { type TutorialTag } from '@/lib/tags'

export type ViewMode = 'grid-2' | 'grid-4'

interface FilterContextType {
  selectedTags: TutorialTag[]
  searchQuery: string
  difficultyFilter: number | null
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export const FilterContext = createContext<FilterContextType | null>(null)

export function useFilterContext() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilterContext must be used within MainLayout')
  }
  return context
}

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [selectedTags, setSelectedTags] = useState<TutorialTag[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid-2')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const pathname = usePathname()
  
  // チュートリアル詳細ページかどうかを判定
  const isTutorialDetailPage = pathname?.startsWith('/tutorial/') && pathname !== '/tutorial'

  const handleTagToggle = (tag: TutorialTag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const filterContextValue: FilterContextType = {
    selectedTags,
    searchQuery,
    difficultyFilter,
    viewMode,
    setViewMode
  }

  return (
    <FilterContext.Provider value={filterContextValue}>
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900">
        <Header onMenuClick={() => setMobileDrawerOpen(true)} />

        <div className="flex pt-16">
          {/* Left Sidebar - Desktop only */}
          <LeftSidebar
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            difficultyFilter={difficultyFilter}
            onDifficultyFilterChange={setDifficultyFilter}
            isOpen={leftSidebarOpen}
            onClose={() => setLeftSidebarOpen(false)}
          />

          {/* Mobile Drawer */}
          <MobileDrawer
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            difficultyFilter={difficultyFilter}
            onDifficultyFilterChange={setDifficultyFilter}
            isOpen={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
          />

          {/* Main Content */}
          <main className={`flex-1 md:ml-64 min-h-[calc(100vh-4rem)] relative overflow-x-hidden ${isTutorialDetailPage ? 'md:mr-64' : ''}`}>
            {children}
          </main>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </FilterContext.Provider>
  )
}