import BLOG from 'blog.config'
import React from 'react'
import dynamic from 'next/dynamic'

import 'animate.css'
import '@/styles/globals.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import '@/styles/notion.css' //  重写部分样式

// 代码样式  更多样式参考： https://github.com/PrismJS/prism-themes
import 'prism-themes/themes/prism-material-light.css'

// local webfont @see https://fontsource.org/
import '@fontsource/noto-sans-sc'
import '@fontsource/noto-serif-sc'

// local fontawesome 6.2.1 @see https://www.npmjs.com/package/@fortawesome/fontawesome-free
import '@fortawesome/fontawesome-free/css/all.min.css'

// import '@/styles/prism-mac-style.css' // code 左上角显示mac的红黄绿图标

import { GlobalContextProvider } from '@/lib/global'
import { DebugPanel } from '@/components/DebugPanel'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Fireworks } from '@/components/Fireworks'

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const GoogleAdsense = dynamic(() => import('@/components/GoogleAdsense'), {
  ssr: false
})
const Messenger = dynamic(() => import('@/components/FacebookMessenger'), {
  ssr: false
})

const MyApp = ({ Component, pageProps }) => {
  // 外部插件
  const externalPlugins = <>
        {JSON.parse(BLOG.THEME_SWITCH) && <ThemeSwitch />}
        {JSON.parse(BLOG.DEBUG) && <DebugPanel />}
        {BLOG.ANALYTICS_ACKEE_TRACKER && <Ackee />}
        {BLOG.ANALYTICS_GOOGLE_ID && <Gtag />}
        {JSON.parse(BLOG.ANALYTICS_BUSUANZI_ENABLE) && <Busuanzi />}
        {BLOG.ADSENSE_GOOGLE_ID && <GoogleAdsense />}
        {BLOG.FACEBOOK_APP_ID && BLOG.FACEBOOK_PAGE_ID && <Messenger />}
        {JSON.parse(BLOG.FIREWORKS) && <Fireworks />}
    </>

  // 默认Webfont:  请在font.js文件中检查font-family 新版改从npm本地导入；
  const DEFAULT_FONTS_URL = [
    // 'https://fonts.font.im/css2?family=Noto+Sans+SC&display=optional',
    // 'https://fonts.font.im/css2?family=Noto+Serif+SC&display=optional'
  ]

  // 用户指定CUSTOM_FONT 则取CUSTOM_FONT_URL
  const FONTS_URL = BLOG.CUSTOM_FONT ? BLOG.CUSTOM_FONT_URL : DEFAULT_FONTS_URL

  return (
        <GlobalContextProvider>
            {/* 渲染所有字体 */}
            {FONTS_URL?.map(fontUrl => <link href={`${fontUrl}`} key={fontUrl} rel="stylesheet" />)}
            {externalPlugins}
            <Component {...pageProps} />
        </GlobalContextProvider>
  )
}

export default MyApp
