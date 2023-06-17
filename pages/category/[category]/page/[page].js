import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import React, { Suspense, useEffect, useState } from 'react'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import BLOG from '@/blog.config'
import Loading from '@/components/Loading'

const layout = 'LayoutCategory'

/**
 * 加载默认主题
 */
const DefaultLayout = dynamic(() => import(`@/themes/${BLOG.THEME}/${layout}`), { ssr: true })

/**
 * 分类页
 * @param {*} props
 * @returns
 */
export default function Category(props) {
  const { theme } = useGlobal()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const [Layout, setLayout] = useState(DefaultLayout)
  // 切换主题
  useEffect(() => {
    const loadLayout = async () => {
      const newLayout = await dynamic(() => import(`@/themes/${theme}/${layout}`))
      setLayout(newLayout)
    }
    loadLayout()
  }, [theme])

  const meta = {
    title: `${props.category} | ${locale.COMMON.CATEGORY} | ${
      siteInfo?.title || ''
    }`,
    description: siteInfo?.description,
    slug: 'category/' + props.category,
    image: siteInfo?.pageCover,
    type: 'website'
  }

  props = { ...props, meta }

  return <Suspense fallback={<Loading/>}>
    <Layout {...props} />
  </Suspense>
}

export async function getStaticProps({ params: { category, page } }) {
  const from = 'category-page-props'
  let props = await getGlobalNotionData({ from })

  // 过滤状态类型
  props.posts = props.allPages.filter(page => page.type === 'Post' && page.status === 'Published').filter(post => post && post.category && post.category.includes(category))
  // 处理文章页数
  props.postCount = props.posts.length
  // 处理分页
  props.posts = props.posts.slice(BLOG.POSTS_PER_PAGE * (page - 1), BLOG.POSTS_PER_PAGE * page)

  delete props.allPages
  props.page = page

  props = { ...props, category, page }

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'category-paths'
  const { categoryOptions, allPages } = await getGlobalNotionData({ from })
  const paths = []

  categoryOptions?.forEach(category => {
    // 过滤状态类型
    const categoryPosts = allPages.filter(page => page.type === 'Post' && page.status === 'Published').filter(post => post && post.category && post.category.includes(category.name))
    // 处理文章页数
    const postCount = categoryPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { category: category.name, page: '' + i } })
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}
