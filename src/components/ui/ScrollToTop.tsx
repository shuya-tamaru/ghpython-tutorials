'use client'

import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // 500px以上スクロールしたら表示
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', toggleVisibility)

    // クリーンアップ
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // スムーズなアニメーション
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-50
            w-12 h-12 rounded-full
            bg-primary hover:bg-primary/90
            text-white shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            flex items-center justify-center
            group
          "
          aria-label="トップに戻る"
        >
          <FaArrowUp className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform duration-200" />
        </button>
      )}
    </>
  )
}