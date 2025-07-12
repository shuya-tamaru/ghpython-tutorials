'use client'

import { useEffect } from 'react'

export function useBodyBackground(isDarkMode: boolean) {
  useEffect(() => {
    const lightBg = '#F8F9FA'
    const darkBg = 'rgb(17, 24, 39)' // gray-900
    
    const backgroundColor = isDarkMode ? darkBg : lightBg
    
    // body と html の背景色を設定
    document.body.style.backgroundColor = backgroundColor
    document.documentElement.style.backgroundColor = backgroundColor
    
    // クリーンアップ
    return () => {
      document.body.style.backgroundColor = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [isDarkMode])
}