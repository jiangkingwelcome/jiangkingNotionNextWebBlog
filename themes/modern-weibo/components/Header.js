import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import CONFIG from '../config'

/**
 * 暗黑科技感头部组件
 */
const Header = (props) => {
  const { siteInfo } = props
  const [scrolled, setScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击外部关闭消息面板
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  // 系统消息数据
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: '欢迎来到社交科技博客',
      message: '探索前沿技术，分享编程智慧',
      time: '刚刚',
      icon: '🎮'
    },
    {
      id: 2,
      type: 'success',
      title: '系统状态良好',
      message: '所有服务运行正常',
      time: '2分钟前',
      icon: '✅'
    },
    {
      id: 3,
      type: 'update',
      title: '主题更新',
      message: 'Social Gaming App 风格已启用',
      time: '5分钟前',
      icon: '🚀'
    }
  ]

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <>
      {/* 科技感顶部公告栏 */}
      {siteConfig('MODERN_WEIBO_TOP_BAR', null, CONFIG) && (
        <div className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-center py-2 md:py-3 px-4 text-xs md:text-sm font-mono relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse'></div>
          <div className='relative z-10 flex items-center justify-center gap-2'>
            <span className='text-yellow-300 animate-ping'>🎮</span>
            <span className='font-bold tracking-wider'>
              {siteConfig('MODERN_WEIBO_TOP_BAR_CONTENT', null, CONFIG)}
            </span>
            <span className='text-yellow-300 animate-ping'>🎮</span>
          </div>
        </div>
      )}
      
      <header className={`modern-header transition-all duration-500 ${scrolled ? 'shadow-2xl border-b-2 border-pink-400/30' : ''}`}>
        <div className='modern-container'>
          <div className='flex items-center justify-between py-3 md:py-4'>
            {/* Logo区域 */}
            <div className='flex items-center space-x-2 md:space-x-4 flex-1 min-w-0'>
              {/* 站点Logo */}
              {siteInfo?.icon && (
                <Link href='/' className='flex items-center space-x-2 group flex-shrink-0'>
                  <div className='relative'>
                    <img 
                      src={siteInfo.icon} 
                      alt='Logo'
                      className='w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-pink-500 shadow-lg shadow-pink-500/50 group-hover:shadow-pink-500/80 transition-all duration-300'
                    />
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </Link>
              )}
              
              {/* 站点标题 */}
              <Link href='/' className='modern-logo hover:opacity-80 transition-all duration-300 hover:scale-105 min-w-0 flex-1'>
                <span className='relative text-sm md:text-base lg:text-lg truncate block'>
                  {siteConfig('MODERN_WEIBO_LOGO_TEXT', null, CONFIG) || siteInfo?.title || 'Social Tech Blog'}
                  <div className='absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded blur opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10'></div>
                </span>
              </Link>
            </div>

            {/* 右侧工具栏 */}
            <div className='flex items-center space-x-2 md:space-x-4 flex-shrink-0'>
              {/* 系统消息按钮 */}
              <div className='relative' ref={notificationRef}>
                <button
                  onClick={handleNotificationClick}
                  className={`relative p-2 md:p-3 rounded-lg border transition-all duration-300 group bg-gray-800/50 backdrop-blur-sm ${
                    showNotifications 
                      ? 'text-pink-400 border-pink-400 bg-pink-500/10' 
                      : 'text-gray-400 hover:text-pink-400 border-gray-600 hover:border-pink-400'
                  }`}
                  title='系统消息'
                >
                  <svg className='w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-3.5-3.5a8.38 8.38 0 01-1.5-5C15 5.5 12.5 3 9.5 3S4 5.5 4 8.5c0 2-.5 4-1.5 5L0 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9' />
                  </svg>
                  
                  {/* 消息数量小红点 */}
                  <span className='absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse border-2 border-gray-800 flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>{notifications.length}</span>
                  </span>
                  
                  <div className='absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </button>

                {/* 消息下拉面板 */}
                {showNotifications && (
                  <div className='absolute top-full right-0 mt-2 w-72 md:w-80 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-pink-500/20 z-50 animate-in slide-in-from-top-2 duration-200'>
                    {/* 标题栏 */}
                    <div className='flex items-center justify-between p-3 md:p-4 border-b border-pink-500/20'>
                      <h3 className='text-white font-semibold flex items-center gap-2 text-sm md:text-base'>
                        <span className='text-pink-400'>🔔</span>
                        系统消息
                      </h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className='text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-gray-700 rounded'
                      >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                      </button>
                    </div>

                    {/* 消息列表 */}
                    <div className='max-h-80 md:max-h-96 overflow-y-auto'>
                      {notifications.map((notification) => (
                        <div key={notification.id} className='p-3 md:p-4 border-b border-gray-700/50 hover:bg-pink-500/10 transition-colors duration-200 cursor-pointer'>
                          <div className='flex items-start gap-3'>
                            <span className='text-lg md:text-2xl'>{notification.icon}</span>
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center justify-between mb-1'>
                                <h4 className='text-white font-medium text-xs md:text-sm truncate'>{notification.title}</h4>
                                <span className='text-gray-400 text-xs flex-shrink-0 ml-2'>{notification.time}</span>
                              </div>
                              <p className='text-gray-300 text-xs md:text-sm'>{notification.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 底部操作 */}
                    <div className='p-3 md:p-4 border-t border-pink-500/20'>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className='w-full text-center text-pink-400 hover:text-white text-xs md:text-sm font-medium py-2 hover:bg-pink-500/10 rounded-lg transition-all duration-200'
                      >
                        查看全部消息
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 状态指示器 */}
              <div className='hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-600'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-xs text-green-400 font-mono tracking-wider'>ONLINE</span>
              </div>

              {/* 科技感用户头像 */}
              <div className='relative group cursor-pointer'>
                <div className='w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 border border-gray-600 hover:border-pink-400'>
                  <span className='text-white text-xs md:text-sm font-bold font-mono tracking-wider'>
                    {siteConfig('AUTHOR', '').charAt(0).toUpperCase() || 'DEV'}
                  </span>
                  {/* 装饰性扫描线 */}
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-y-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                
                {/* 悬停状态指示器 */}
                <div className='absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse'></div>
              </div>
            </div>
          </div>

          {/* 科技感底部装饰线 */}
          <div className={`h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </header>
    </>
  )
}

export default Header 