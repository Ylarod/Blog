import BLOG from '@/blog.config'
import { isBrowser, loadExternalResource } from '@/lib/utils'

/**
 * 自定义引入外部JS 和 CSS
 * @returns
 */
const ExternalScript = () => {
  if (isBrowser()) {
    // 静态导入本地自定义样式
    loadExternalResource(BLOG.FONT_AWESOME, 'css')
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')
    if (BLOG.CUSTOM_EXTERNAL_JS && BLOG.CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of BLOG.CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }
    if (BLOG.CUSTOM_EXTERNAL_CSS && BLOG.CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of BLOG.CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
    // 渲染所有字体
    BLOG.FONT_URL?.forEach(e => {
      loadExternalResource(e, 'css')
    })
  }

  return null
}

export default ExternalScript
