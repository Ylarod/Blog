'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import DashboardUser from './DashboardUser'

const DashboardMenuList = dynamic(() => import('./DashboardMenuList'))
const DashboardItemMembership = dynamic(
  () => import('./DashboardItemMembership')
)
const DashboardItemBalance = dynamic(() => import('./DashboardItemBalance'))
const DashboardItemHome = dynamic(() => import('./DashboardItemHome'))
const DashboardItemOrder = dynamic(() => import('./DashboardItemOrder'))
const DashboardItemAffliate = dynamic(() => import('./DashboardItemAffliate'))
/**
 * 仪表盘内容主体
 * 组件懒加载
 * @returns
 */
export default function DashboardBody() {
  const { asPath } = useRouter()
  // 提取不包含查询参数的路径部分
  const basePath = asPath.split('?')[0]
  return (
    <div className='flex flex-col md:flex-row w-full container gap-x-4 min-h-96 mx-auto mb-12 justify-center'>
      <div className='side-tabs w-full md:w-72'>
        <DashboardMenuList />
      </div>
      {/* 控制台右侧内容 */}
      <div className='main-content-wrapper w-full'>
        {basePath === '/dashboard' && <DashboardItemHome />}
        {basePath?.indexOf('/dashboard/user-profile') === 0 && (
          <DashboardUser />
        )}
        {basePath === '/dashboard/balance' && <DashboardItemBalance />}
        {basePath === '/dashboard/membership' && <DashboardItemMembership />}
        {basePath === '/dashboard/order' && <DashboardItemOrder />}
        {basePath === '/dashboard/affiliate' && <DashboardItemAffliate />}
      </div>
    </div>
  )
}
