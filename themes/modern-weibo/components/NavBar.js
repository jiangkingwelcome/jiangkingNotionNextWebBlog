import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CONFIG from '../config'

/**
 * 现代微博风格导航栏组件
 */
const NavBar = (props) => {
  const { categoryOptions, tagOptions } = props
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 导航菜单项
  const menuItems = [
    {
      name: '首页',
      href: '/',
      icon: (
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
        </svg>
      )
    },
    {
      name: '分类',
      href: '/category',
      icon: (
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
        </svg>
      ),
      show: siteConfig('MODERN_WEIBO_MENU_CATEGORY', null, CONFIG),
      children: categoryOptions?.slice(0, 8).map(cat => ({
        name: cat.name,
        href: `/category/${cat.name}`,
        count: cat.count
      }))
    },
    {
      name: '标签',
      href: '/tag',
      icon: (
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
        </svg>
      ),
      show: siteConfig('MODERN_WEIBO_MENU_TAG', null, CONFIG)
    },
    {
      name: '归档',
      href: '/archive',
      icon: (
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
        </svg>
      ),
      show: siteConfig('MODERN_WEIBO_MENU_ARCHIVE', null, CONFIG)
    }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <nav className='bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md border-b border-pink-500/20 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 桌面端布局 */}
        <div className='hidden md:flex items-center justify-between py-4'>
          {/* 导航菜单 */}
          <div className='flex items-center space-x-8'>
            {menuItems.map((item, index) => {
              // 检查是否显示该菜单项
              if (item.show === false) return null

              return (
                <div key={index} className='relative group'>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-500/30' 
                        : 'text-gray-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-pink-500/30'
                    }`}
                  >
                    {item.icon}
                    <span className='font-semibold'>{item.name}</span>
                    {item.children && (
                      <svg className='w-3 h-3 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    )}
                  </Link>

                  {/* 下拉菜单 */}
                  {item.children && (
                    <div className='absolute top-full left-0 mt-2 w-64 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-pink-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'>
                      <div className='p-4'>
                        <div className='grid grid-cols-2 gap-2'>
                          {item.children.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              href={child.href}
                              className='flex items-center justify-between px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-pink-500/20 rounded-lg transition-all duration-200 border border-transparent hover:border-pink-500/30'
                            >
                              <span className='truncate font-medium'>{child.name}</span>
                              {child.count && (
                                <span className='text-xs text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full ml-2 font-mono'>
                                  {child.count}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                        <div className='border-t border-pink-500/20 mt-3 pt-3'>
                          <Link
                            href={item.href}
                            className='block px-3 py-2 text-sm text-pink-400 hover:text-white hover:bg-pink-500/20 rounded-lg transition-all duration-200 font-semibold'
                          >
                            查看全部 →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 搜索框 */}
          {siteConfig('MODERN_WEIBO_MENU_SEARCH', null, CONFIG) && (
            <div className='flex-1 max-w-md ml-8'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='搜索文章...'
                  className='w-full pl-12 pr-4 py-3 text-sm bg-white/10 border border-gray-600 hover:border-pink-500/50 focus:border-pink-500 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/20'
                />
              </div>
            </div>
          )}
        </div>

        {/* 移动端布局 */}
        <div className='md:hidden py-2'>
          {/* 移动端顶部栏 */}
          <div className='flex items-center justify-between'>
            {/* 移动端导航菜单 - 横向滚动 */}
            <div className='flex items-center space-x-2 flex-1 overflow-x-auto scrollbar-hide'>
              {menuItems.map((item, index) => {
                // 检查是否显示该菜单项
                if (item.show === false) return null

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-1 whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                      isActive(item.href) 
                        ? 'text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-500/30' 
                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className='w-4 h-4'>{item.icon}</span>
                    <span className='font-semibold text-xs'>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* 移动端搜索按钮 */}
            {siteConfig('MODERN_WEIBO_MENU_SEARCH', null, CONFIG) && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='ml-2 p-2 text-gray-400 hover:text-pink-400 rounded-lg border border-gray-600 hover:border-pink-400 transition-all duration-300 bg-gray-800/50 flex-shrink-0'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </button>
            )}
          </div>

          {/* 移动端搜索框 */}
          {isMobileMenuOpen && siteConfig('MODERN_WEIBO_MENU_SEARCH', null, CONFIG) && (
            <div className='pt-3'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='搜索文章...'
                  className='w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-gray-600 hover:border-pink-500/50 focus:border-pink-500 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/20'
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar 