import { type TutorialTag } from '@/lib/tags'

export interface TutorialFrontmatter {
  day: string
  title: string
  difficulty: number
  tags: TutorialTag[]
}

export interface Tutorial {
  id: string // dayXXX format
  day: string
  title: string
  difficulty: number
  tags: TutorialTag[]
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
  tags: TutorialTag[]
  thumbnailPath: string
  slug: string
}

export type TutorialFilterOptions = {
  tags?: TutorialTag[]
  difficulty?: number | null
  searchQuery?: string
}