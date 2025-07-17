export interface TutorialFrontmatter {
  day: string
  title: string
  difficulty: number
  tags: string[]
}

export interface Tutorial {
  id: string // dayXXX format
  day: string
  title: string
  difficulty: number
  tags: string[]
  content: string
  htmlContent: string
  thumbnailPath: string
  slug: string
}

export interface TutorialMetadata {
  id: string
  day: string
  title: string
  difficulty: number
  tags: string[]
  thumbnailPath: string
  slug: string
}

export type TutorialFilterOptions = {
  tags?: string[]
  difficulty?: number | null
  dayFilter?: number | null
  searchQuery?: string
}