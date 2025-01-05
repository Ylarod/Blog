import throttle from 'lodash.throttle'
import { useCallback, useEffect } from 'react'

/**
 * 回顶按钮
 * @returns
 */
export const BackToTopButton = () => {
  useEffect(() => {
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    window.addEventListener('scroll', navBarScollListener)
    return () => {
      window.removeEventListener('scroll', navBarScollListener)
    }
  }, [])

  // 滚动监听
  const throttleMs = 200
  const navBarScollListener = useCallback(
    throttle(() => {
      const scrollY = window.scrollY
      // 显示或隐藏返回顶部按钮
      const backToTop = document.querySelector('.back-to-top')
      if (backToTop) {
        backToTop.style.display = scrollY > 50 ? 'flex' : 'none'
      }
    }, throttleMs)
  )

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop
    const change = to - start
    const increment = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increment

      const val = Math.easeInOutQuad(currentTime, start, change, duration)

      element.scrollTop = val

      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }

    animateScroll()
  }

  function scrollTop() {
    if (document) {
      scrollTo(document.documentElement)
    }
  }

  return (
    <>
      {/* <!-- ====== Back To Top Start --> */}
      <a
        onClick={scrollTop}
        className='back-to-top cursor-pointer fixed bottom-16 left-auto right-8 z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark'>
        <span className='mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white'></span>
      </a>
      {/* <!-- ====== Back To Top End --> */}
    </>
  )
}
