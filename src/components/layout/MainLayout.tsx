'use client'

import { useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import MobileDrawer from './MobileDrawer'
import ScrollToTop from '@/components/ui/ScrollToTop'

export type ViewMode = 'grid-2' | 'grid-4'

interface FilterContextType {
  selectedTags: string[]
  searchQuery: string
  difficultyFilter: number | null
  dayFilter: number | null
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
  availableTags?: string[]
  totalTutorialsCount?: number
}

export default function MainLayout({ children, availableTags = [], totalTutorialsCount = 0 }: MainLayoutProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid-2')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null)
  const [dayFilter, setDayFilter] = useState<number | null>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const pathname = usePathname()
  
  // チュートリアル詳細ページかどうかを判定
  const isTutorialDetailPage = pathname?.startsWith('/tutorial/') && pathname !== '/tutorial'

  const handleTagToggle = (tag: string) => {
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
    dayFilter,
    viewMode,
    setViewMode
  }

  return (
    <FilterContext.Provider value={filterContextValue}>
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900">
        <Header onMenuClick={() => setMobileDrawerOpen(true)} />

        {/* Container for wide screens */}
        <div className="max-w-7xl mx-auto pt-16">
          <div className="flex">
            {/* Left Sidebar - Desktop only */}
            <LeftSidebar
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              difficultyFilter={difficultyFilter}
              onDifficultyFilterChange={setDifficultyFilter}
              dayFilter={dayFilter}
              onDayFilterChange={setDayFilter}
              maxDay={totalTutorialsCount}
              isOpen={leftSidebarOpen}
              onClose={() => setLeftSidebarOpen(false)}
              availableTags={availableTags}
              totalTutorialsCount={totalTutorialsCount}
            />

            {/* Mobile Drawer */}
            <MobileDrawer
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              difficultyFilter={difficultyFilter}
              onDifficultyFilterChange={setDifficultyFilter}
              dayFilter={dayFilter}
              onDayFilterChange={setDayFilter}
              maxDay={totalTutorialsCount}
              isOpen={mobileDrawerOpen}
              onClose={() => setMobileDrawerOpen(false)}
              availableTags={availableTags}
              totalTutorialsCount={totalTutorialsCount}
            />

            {/* Main Content */}
            <main className={`flex-1 min-h-screen relative overflow-x-hidden pb-20 ${isTutorialDetailPage ? 'md:mr-64' : ''}`}>
              {children}
            </main>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </FilterContext.Provider>
  )
}