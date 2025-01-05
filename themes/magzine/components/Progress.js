import { isBrowser } from '@/lib/utils'
import { useEffect, useState } from 'react'

/**
 * 顶部页面阅读进度条
 * @returns {JSX.Element}
 * @constructor
 */
const Progress = ({ targetRef, showPercent = true }) => {
  const currentRef = targetRef?.current || targetRef
  const [percent, changePercent] = useState(0)
  const scrollListener = () => {
    const target =
      currentRef || (isBrowser && document.getElementById('article-wrapper'))
    if (target) {
      const clientHeight = target.clientHeight
      const scrollY = window.pageYOffset
      const fullHeight = clientHeight - window.outerHeight
      let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
      if (per > 100) per = 100
      if (per < 0) per = 0
      changePercent(per)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <div className='h-4 w-full shadow-2xl bg-hexo-light-gray dark:bg-gray-900'>
      <div
        className='h-4 dark:bg-black bg-hexo-black-gray duration-200'
        style={{ width: `${percent}%` }}>
        {showPercent && (
          <div className='text-right text-white text-xs'>{percent}%</div>
        )}
      </div>
    </div>
  )
}

export default Progress
