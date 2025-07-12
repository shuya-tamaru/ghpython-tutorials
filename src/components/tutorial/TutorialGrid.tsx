'use client'

import TutorialCard from '@/components/ui/TutorialCard'
import ViewToggle from '@/components/ui/ViewToggle'
import { FilteredTutorialProvider, useFilteredTutorials } from '@/components/layout/FilteredTutorialProvider'
import { useFilterContext } from '@/components/layout/MainLayout'
import { IoIosSearch } from 'react-icons/io'
import { type Tutorial } from '@/types/tutorial'

interface TutorialGridProps {
  tutorials: Tutorial[]
}

function TutorialGridContent() {
  const { filteredTutorials, totalCount } = useFilteredTutorials()
  const { viewMode, setViewMode } = useFilterContext()
  const gridClasses = viewMode === 'grid-4' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
    : 'grid grid-cols-1 md:grid-cols-2 gap-6'

  return (
    <div>
      {/* Header with Results Info and View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredTutorials.length} / {totalCount} tutorials
        </p>
        <div className="hidden md:block">
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className={gridClasses}>
        {filteredTutorials.map((tutorial) => (
          <TutorialCard 
            key={tutorial.id} 
            tutorial={tutorial} 
            viewMode={viewMode}
          />
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <IoIosSearch className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No tutorials found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try changing your search terms or filters
          </p>
        </div>
      )}
    </div>
  )
}

export default function TutorialGrid({ tutorials }: TutorialGridProps) {
  const { selectedTags, searchQuery, difficultyFilter } = useFilterContext()

  return (
    <FilteredTutorialProvider
      tutorials={tutorials}
      selectedTags={selectedTags}
      searchQuery={searchQuery}
      difficultyFilter={difficultyFilter}
    >
      <TutorialGridContent />
    </FilteredTutorialProvider>
  )
}