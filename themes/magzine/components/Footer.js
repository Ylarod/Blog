import DarkModeButton from '@/components/DarkModeButton'
import { GongAnBeiAn } from '@/components/GongAnBeiAn'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import SocialButton from './SocialButton'

/**
 * 网页底脚
 */
const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear
  const { siteInfo } = useGlobal()
  const MAGZINE_FOOTER_LINKS = siteConfig('MAGZINE_FOOTER_LINKS', [])

  return (
    <footer
      id='footer-bottom'
      className='z-10 bg-black text-white justify-center m-auto w-full p-6 relative'>
      <div className='max-w-screen-3xl w-full mx-auto '>
        {/* 信息与链接区块 */}
        <div className='w-full flex lg:flex-row flex-col justify-between py-16'>
          <div className='gap-x-2 py-6 flex items-center'>
            {/* 站长信息 */}
            <LazyImage
              src={siteInfo?.icon}
              className='rounded-full'
              width={40}
              alt={siteConfig('AUTHOR')}
            />
            <div>
              <h1 className='text-lg'>{title}</h1>
              <i className='fas fa-copyright' />
              <a
                href={siteConfig('LINK')}
                className='underline font-bold justify-start  '>
                {siteConfig('AUTHOR')}
              </a>
            </div>
          </div>

          {/* 右侧链接区块 */}
          <div className='grid grid-cols-2 lg:grid-cols-4 lg:gap-16 gap-8'>
            {MAGZINE_FOOTER_LINKS?.map((group, index) => {
              return (
                <div key={index}>
                  <div className='font-bold text-xl text-white lg:pb-8 pb-4'>
                    {group.name}
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    {group?.menus?.map((menu, index) => {
                      return (
                        <div key={index}>
                          <Link href={menu.href} className='hover:underline'>
                            {menu.title}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 页脚 */}
        <div className='py-4 flex flex-col lg:flex-row  justify-between items-center border-t border-gray-400'>
          <div className='flex gap-x-2 justify-between items-center'>
            <span className='whitespace-nowrap'>{`${copyrightDate}`}</span>

            {siteConfig('BEI_AN') && (
              <>
                <i className='fas fa-shield-alt' />
                <a href='https://beian.miit.gov.cn/' className='mr-2'>
                  {siteConfig('BEI_AN')}
                </a>
                <br />
              </>
            )}
            <GongAnBeiAn />

            <div className='text-sm font-serif'>
              Powered by
              <a
                href='https://github.com/tangly1024/NotionNext'
                className='underline justify-start text-white'>
                NotionNext {siteConfig('VERSION')}
              </a>
              .
            </div>
          </div>

          <DarkModeButton className='text-white' />

          <div className='flex justify-between items-center gap-x-2'>
            <div className='flex items-center gap-x-4'>
              <div>
                <span className='hidden busuanzi_container_site_pv'>
                  <i className='fas fa-eye' />
                  <span className='px-1 busuanzi_value_site_pv'> </span>
                </span>
                <span className='pl-2 hidden busuanzi_container_site_uv'>
                  <i className='fas fa-users' />
                  <span className='px-1 busuanzi_value_site_uv'> </span>
                </span>
              </div>
              <SocialButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
