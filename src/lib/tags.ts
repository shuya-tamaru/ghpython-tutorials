export const TUTORIAL_TAGS = [
  'array',
  'grid', 
  'box',
  'move',
  'louver',
  'sin',
  'wave',
  'sphere',
  'ring',
  'geometry',
  'transform',
  'pattern',
  'parametric'
] as const

export type TutorialTag = typeof TUTORIAL_TAGS[number]

export const TAG_COLORS: Record<TutorialTag, string> = {
  array: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  grid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  box: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  move: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  louver: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  sin: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  wave: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  sphere: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  ring: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  geometry: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  transform: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
  pattern: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  parametric: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
}