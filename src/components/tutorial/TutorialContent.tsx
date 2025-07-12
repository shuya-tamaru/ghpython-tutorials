'use client'

import { useMemo } from 'react'
import CodeBlock from '@/components/ui/CodeBlock'

interface TutorialContentProps {
  content: string
}

export default function TutorialContent({ content }: TutorialContentProps) {
  const parsedContent = useMemo(() => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let currentElement: string[] = []
    let inCodeBlock = false
    let codeLanguage = ''
    let elementIndex = 0

    const flushCurrentElement = () => {
      if (currentElement.length > 0) {
        const text = currentElement.join('\n').trim()
        if (text) {
          elements.push(
            <div key={`text-${elementIndex++}`} className="mb-4">
              {parseInlineContent(text)}
            </div>
          )
        }
        currentElement = []
      }
    }

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          if (currentElement.length > 0) {
            const code = currentElement.join('\n')
            elements.push(
              <div key={`code-${elementIndex++}`} className="mb-6">
                <CodeBlock language={codeLanguage || 'python'}>
                  {code}
                </CodeBlock>
              </div>
            )
          }
          currentElement = []
          inCodeBlock = false
          codeLanguage = ''
        } else {
          // Start of code block
          flushCurrentElement()
          inCodeBlock = true
          codeLanguage = line.substring(3).trim() || 'python'
        }
      } else {
        if (inCodeBlock) {
          currentElement.push(line)
        } else {
          currentElement.push(line)
        }
      }
    })

    // Flush remaining content
    if (inCodeBlock && currentElement.length > 0) {
      const code = currentElement.join('\n')
      elements.push(
        <div key={`code-${elementIndex++}`} className="mb-6">
          <CodeBlock language={codeLanguage || 'python'}>
            {code}
          </CodeBlock>
        </div>
      )
    } else {
      flushCurrentElement()
    }

    return elements
  }, [content])

  return <div className="tutorial-content">{parsedContent}</div>
}

function parseInlineContent(text: string): JSX.Element[] {
  const lines = text.split('\n')
  const elements: JSX.Element[] = []
  let listItems: string[] = []
  let inList = false

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside mb-4 space-y-1">
          {listItems.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {item.replace(/^-\s*/, '')}
            </li>
          ))}
        </ul>
      )
      listItems = []
      inList = false
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('##')) {
      flushList()
      const headerText = trimmed.replace(/^#+\s*/, '')
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
          {headerText}
        </h2>
      )
    } else if (trimmed.startsWith('#')) {
      flushList()
      const headerText = trimmed.replace(/^#+\s*/, '')
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
          {headerText}
        </h1>
      )
    } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      inList = true
      listItems.push(trimmed)
    } else if (trimmed === '') {
      if (inList) {
        flushList()
      } else if (elements.length > 0) {
        // Add some spacing
      }
    } else {
      flushList()
      if (trimmed) {
        elements.push(
          <p key={`p-${elements.length}`} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {trimmed}
          </p>
        )
      }
    }
  })

  flushList()
  return elements
}