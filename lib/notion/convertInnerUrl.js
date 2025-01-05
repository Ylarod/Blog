import { idToUuid } from 'notion-utils'
import { checkStrIsNotionId, getLastPartOfUrl, isBrowser } from '../utils'
import { loadLangFromLocalStorage } from '@/lib/lang'

/**
 * 处理页面内连接跳转:
 * 1.若是本站域名，则在当前窗口打开、不开新窗口
 * 2.url是notion-id，转成站内文章链接
 */
export const convertInnerUrl = allPages => {
  if (!isBrowser) {
    return
  }
  const allAnchorTags = document
    ?.getElementById('notion-article')
    ?.querySelectorAll('a.notion-link')

  if (!allAnchorTags) {
    return
  }
  const { origin, pathname } = window.location;
  const currentURL = origin + pathname
  const currentPathLang = pathname.split('/').filter(Boolean)[0]
  const lang = loadLangFromLocalStorage().split(/[-_]/)[0]
  const langPrefix = lang === currentPathLang ? '/' + lang : ''
  for (const anchorTag of allAnchorTags) {
    // url替换成slug
    if (anchorTag?.href) {
      // 如果url是一个Notion_id，尝试匹配成博客的文章内链
      const slug = getLastPartOfUrl(anchorTag.href)
      if (checkStrIsNotionId(slug)) {
        const slugPage = allPages?.find(page => {
          return idToUuid(slug).indexOf(page.short_id) === 14
        })
        if (slugPage) {
          anchorTag.href = langPrefix + slugPage?.href
        }
      }
    }
    // 链接在当前页面打开
    if (anchorTag?.target === '_blank') {
      const hrefWithoutQueryHash = anchorTag.href.split('?')[0].split('#')[0]
      const hrefWithRelativeHash =
        currentURL.split('#')[0] || '' + anchorTag.href.split('#')[1] || ''
      if (
        currentURL === hrefWithoutQueryHash ||
        currentURL === hrefWithRelativeHash
      ) {
        anchorTag.target = '_self'
      }
    }
  }
}