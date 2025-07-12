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
  'parametric',
  'rotate',
  'circle',
  'polar'
] as const

export type TutorialTag = typeof TUTORIAL_TAGS[number]

export const TAG_COLORS: Record<TutorialTag, string> = {
  array: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  grid: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  box: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  move: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  louver: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  sin: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  wave: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  sphere: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  ring: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  geometry: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  transform: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  pattern: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  parametric: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  rotate: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  circle: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
  polar: 'bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
}