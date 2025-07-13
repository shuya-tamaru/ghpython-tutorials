import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { type Tutorial, type TutorialMetadata, type TutorialFrontmatter, type TutorialFilterOptions } from '@/types/tutorial'
import { formatDayId, getThumbnailPath } from '@/lib/utils'

const tutorialsDirectory = path.join(process.cwd(), 'src/content/tutorials')

export async function getAllTutorials(): Promise<Tutorial[]> {
  try {
    if (!fs.existsSync(tutorialsDirectory)) {
      console.warn(`Tutorials directory not found: ${tutorialsDirectory}`)
      return []
    }

    const fileNames = fs.readdirSync(tutorialsDirectory)
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'))
    
    const tutorials = await Promise.all(
      markdownFiles.map(async (fileName) => {
        return await getTutorialByFileName(fileName)
      })
    )

    return tutorials
      .filter((tutorial): tutorial is Tutorial => tutorial !== null)
      .sort((a, b) => {
        const aNum = parseInt(a.id.replace('day', ''), 10)
        const bNum = parseInt(b.id.replace('day', ''), 10)
        return aNum - bNum
      })
  } catch (error) {
    console.error('Error reading tutorials:', error)
    return []
  }
}

export async function getTutorialByFileName(fileName: string): Promise<Tutorial | null> {
  try {
    const filePath = path.join(tutorialsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    const { data, content } = matter(fileContents)
    const frontmatter = data as TutorialFrontmatter
    
    if (!isValidFrontmatter(frontmatter)) {
      console.warn(`Invalid frontmatter in ${fileName}:`, frontmatter)
      return null
    }

    const processedContent = await remark()
      .use(remarkHtml)
      .process(content)
    const htmlContent = processedContent.toString()

    const dayId = formatDayId(frontmatter.day)
    const slug = fileName.replace('.md', '')

    return {
      id: dayId,
      day: frontmatter.day,
      title: frontmatter.title,
      difficulty: frontmatter.difficulty,
      tags: frontmatter.tags,
      content,
      htmlContent,
      thumbnailPath: getThumbnailPath(dayId),
      slug,
    }
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error)
    return null
  }
}

export async function getTutorialById(id: string): Promise<Tutorial | null> {
  const tutorials = await getAllTutorials()
  return tutorials.find(tutorial => tutorial.id === id) || null
}

export async function getTutorialBySlug(slug: string): Promise<Tutorial | null> {
  const tutorials = await getAllTutorials()
  return tutorials.find(tutorial => tutorial.slug === slug) || null
}

export async function getNextTutorial(currentSlug: string): Promise<Tutorial | null> {
  const tutorials = await getAllTutorials()
  const currentIndex = tutorials.findIndex(tutorial => tutorial.slug === currentSlug)
  
  if (currentIndex === -1 || currentIndex === tutorials.length - 1) {
    return null // 見つからないか最後のチュートリアル
  }
  
  return tutorials[currentIndex + 1]
}

export async function getPrevTutorial(currentSlug: string): Promise<Tutorial | null> {
  const tutorials = await getAllTutorials()
  const currentIndex = tutorials.findIndex(tutorial => tutorial.slug === currentSlug)
  
  if (currentIndex === -1 || currentIndex === 0) {
    return null // 見つからないか最初のチュートリアル
  }
  
  return tutorials[currentIndex - 1]
}

export async function getTutorialMetadata(): Promise<TutorialMetadata[]> {
  const tutorials = await getAllTutorials()
  return tutorials.map(tutorial => ({
    id: tutorial.id,
    day: tutorial.day,
    title: tutorial.title,
    difficulty: tutorial.difficulty,
    tags: tutorial.tags,
    thumbnailPath: tutorial.thumbnailPath,
    slug: tutorial.slug,
  }))
}

// filterTutorials function moved to utils.ts for client-side compatibility

export async function getAllTags(): Promise<string[]> {
  const tutorials = await getAllTutorials()
  const allTags = tutorials.flatMap(tutorial => tutorial.tags)
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
}

export function getTutorialsByTag(tag: string): Promise<Tutorial[]> {
  return getAllTutorials().then(tutorials =>
    tutorials.filter(tutorial => tutorial.tags.includes(tag))
  )
}

export function getTutorialsByDifficulty(difficulty: number): Promise<Tutorial[]> {
  return getAllTutorials().then(tutorials =>
    tutorials.filter(tutorial => Math.floor(tutorial.difficulty) === difficulty)
  )
}

function isValidFrontmatter(data: any): data is TutorialFrontmatter {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.day === 'string' &&
    typeof data.title === 'string' &&
    typeof data.difficulty === 'number' &&
    Array.isArray(data.tags) &&
    data.tags.every((tag: any) => typeof tag === 'string')
  )
}