'use client'

import { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-python'
import { FaCopy, FaCheck } from 'react-icons/fa'

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
}

export default function CodeBlock({ children, language = 'python', className = '' }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [children])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2秒後にリセット
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className={`absolute top-2 right-2 p-2 rounded transition-all duration-200 opacity-0 group-hover:opacity-100 ${
          copied 
            ? 'text-green-400 bg-green-900/50' 
            : 'text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600'
        }`}
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <FaCheck className="w-4 h-4" />
        ) : (
          <FaCopy className="w-4 h-4" />
        )}
      </button>
      <pre className={`language-${language} ${className}`}>
        <code ref={codeRef} className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  )
}