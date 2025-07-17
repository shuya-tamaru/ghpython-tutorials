'use client'

import { createContext, useContext, useMemo } from 'react'
import { type Tutorial, type TutorialFilterOptions } from '@/types/tutorial'
import { filterTutorials } from '@/lib/utils'

interface FilteredTutorialContextType {
  filteredTutorials: Tutorial[]
  totalCount: number
}

const FilteredTutorialContext = createContext<FilteredTutorialContextType | null>(null)

interface FilteredTutorialProviderProps {
  children: React.ReactNode
  tutorials: Tutorial[]
  selectedTags: string[]
  searchQuery: string
  difficultyFilter: number | null
  dayFilter: number | null
}

export function FilteredTutorialProvider({
  children,
  tutorials,
  selectedTags,
  searchQuery,
  difficultyFilter,
  dayFilter
}: FilteredTutorialProviderProps) {
  const filteredTutorials = useMemo(() => {
    const filterOptions: TutorialFilterOptions = {
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      searchQuery: searchQuery.trim() || undefined,
      difficulty: difficultyFilter,
      dayFilter: dayFilter
    }

    return filterTutorials(tutorials, filterOptions)
  }, [tutorials, selectedTags, searchQuery, difficultyFilter, dayFilter])

  const value = {
    filteredTutorials,
    totalCount: tutorials.length
  }

  return (
    <FilteredTutorialContext.Provider value={value}>
      {children}
    </FilteredTutorialContext.Provider>
  )
}

export function useFilteredTutorials() {
  const context = useContext(FilteredTutorialContext)
  if (!context) {
    throw new Error('useFilteredTutorials must be used within FilteredTutorialProvider')
  }
  return context
}