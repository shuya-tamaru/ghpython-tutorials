import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Tutorial, type TutorialFilterOptions } from '@/types/tutorial'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getThumbnailPath(dayId: string): string {
  return `/contents/${dayId}/thumbnail.webp`
}

export function getThumbnailPathWithFallback(dayId: string): string {
  const primaryPath = getThumbnailPath(dayId)
  const fallbackPath = '/images/placeholder.jpg'
  
  return primaryPath
}

export function validateImageExists(imagePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = imagePath
  })
}

export function formatDayId(day: string): string {
  const match = day.match(/\d+/)
  if (match) {
    const number = parseInt(match[0], 10)
    return `day${number.toString().padStart(3, '0')}`
  }
  return day.toLowerCase().replace(/\s+/g, '')
}

export function formatDayDisplay(day: string): string {
  const match = day.match(/\d+/)
  if (match) {
    return `Day ${parseInt(match[0], 10)}`
  }
  return day
}

// Client-side filtering functions
export function filterTutorials(tutorials: Tutorial[], options: TutorialFilterOptions): Tutorial[] {
  let filtered = [...tutorials]

  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter(tutorial =>
      options.tags!.some(tag => tutorial.tags.includes(tag))
    )
  }

  if (options.difficulty !== null && options.difficulty !== undefined) {
    filtered = filtered.filter(tutorial =>
      Math.floor(tutorial.difficulty) === options.difficulty
    )
  }

  if (options.searchQuery && options.searchQuery.trim()) {
    const query = options.searchQuery.toLowerCase()
    filtered = filtered.filter(tutorial =>
      tutorial.title.toLowerCase().includes(query) ||
      tutorial.day.toLowerCase().includes(query) ||
      tutorial.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
}