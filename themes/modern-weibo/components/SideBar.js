import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * 现代微博风格侧边栏组件
 */
const SideBar = (props) => {
  const { siteInfo, latestPosts, categoryOptions, tagOptions } = props

  return (
    <div className='space-y-6'>
      {/* 作者信息卡片 */}
      <div className='modern-sidebar-widget'>
        <div className='text-center'>
          {/* 头像 */}
          {siteInfo?.icon && (
            <div className='mb-4'>
              <img
                src={siteInfo.icon}
                alt='Avatar'
                className='w-20 h-20 rounded-full mx-auto object-cover modern-avatar border-2 border-pink-500'
              />
            </div>
          )}
          
          {/* 作者名称 */}
          <h3 className='text-xl font-bold text-white mb-2'>
            {siteConfig('AUTHOR') || 'Jiangking'}
          </h3>
          
          {/* 作者简介 */}
          <p className='text-gray-200 text-sm mb-4 leading-relaxed'>
            {siteConfig('MODERN_WEIBO_AUTHOR_DESCRIPTION', null, CONFIG) || siteConfig('BIO') || '🚀 创新者 | 技术分享者 | 社交连接者'}
          </p>

          {/* 统计信息 */}
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='text-center'>
              <div className='text-lg font-bold text-blue-400'>999</div>
              <div className='text-xs text-gray-300'>文章</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-green-400'>888</div>
              <div className='text-xs text-gray-300'>阅读</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-purple-400'>777</div>
              <div className='text-xs text-gray-300'>点赞</div>
            </div>
          </div>

          {/* 关注按钮 */}
          <button className='modern-btn w-full text-white font-semibold'>
            关注
          </button>
        </div>
      </div>

      {/* 最新文章 */}
      {latestPosts && latestPosts.length > 0 && (
        <div className='modern-sidebar-widget'>
          <h4 className='modern-sidebar-title text-white'>最新文章</h4>
          <div className='space-y-3'>
            {latestPosts.slice(0, 5).map((post, index) => (
              <Link key={index} href={`/${post.slug}`} className='block group'>
                <div className='flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200'>
                  {post.pageCoverThumbnail && (
                    <img
                      src={post.pageCoverThumbnail}
                      alt={post.title}
                      className='w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-600'
                    />
                  )}
                  <div className='flex-1 min-w-0'>
                    <h5 className='text-sm font-medium text-white group-hover:text-pink-400 transition-colors line-clamp-2 leading-5'>
                      {post.title}
                    </h5>
                    <p className='text-xs text-gray-300 mt-1 font-mono'>
                      {post.publishDay}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 热门分类 */}
      {categoryOptions && categoryOptions.length > 0 && (
        <div className='modern-sidebar-widget'>
          <h4 className='modern-sidebar-title text-white'>热门分类</h4>
          <div className='space-y-2'>
            {categoryOptions.slice(0, 6).map((category, index) => (
              <Link 
                key={index} 
                href={`/category/${category.name}`}
                className='flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group border border-transparent hover:border-pink-500/30'
              >
                <span className='text-sm text-white group-hover:text-pink-400 font-medium'>
                  {category.name}
                </span>
                <span className='text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded-full font-mono group-hover:bg-pink-500/20 group-hover:text-pink-300'>
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 热门标签 */}
      {tagOptions && tagOptions.length > 0 && (
        <div className='modern-sidebar-widget'>
          <h4 className='modern-sidebar-title text-white'>热门标签</h4>
          <div className='flex flex-wrap gap-2'>
            {tagOptions.slice(0, 12).map((tag, index) => (
              <Link 
                key={index} 
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className='modern-tag text-xs inline-block px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30 rounded-lg hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300'
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 社交链接 */}
      <div className='modern-sidebar-widget'>
        <h4 className='modern-sidebar-title text-white'>关注我</h4>
        <div className='flex justify-center space-x-4'>
          {/* GitHub */}
          {siteConfig('CONTACT_GITHUB') && (
            <a
              href={siteConfig('CONTACT_GITHUB')}
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-pink-500 rounded-lg border border-gray-600 hover:border-pink-500'
              title='GitHub'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'/>
              </svg>
            </a>
          )}

          {/* Twitter */}
          {siteConfig('CONTACT_TWITTER') && (
            <a
              href={siteConfig('CONTACT_TWITTER')}
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-blue-500 rounded-lg border border-gray-600 hover:border-blue-500'
              title='Twitter'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>
              </svg>
            </a>
          )}

          {/* 邮箱 */}
          {siteConfig('CONTACT_EMAIL') && (
            <a
              href={`mailto:${siteConfig('CONTACT_EMAIL')}`}
              className='p-3 text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-red-500 rounded-lg border border-gray-600 hover:border-red-500'
              title='邮箱'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* 公告栏 */}
      <div className='modern-sidebar-widget'>
        <h4 className='modern-sidebar-title text-white'>公告</h4>
        <div className='text-sm text-gray-200 leading-relaxed bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-lg border border-pink-500/20'>
          <p className='text-white font-medium'>欢迎来到我的博客！</p>
          <p className='mt-2 text-gray-200'>这里记录了我的学习和思考，分享前沿技术与编程智慧。</p>
          <p className='mt-2 text-xs text-gray-300'>
            如有问题，欢迎随时联系我。
          </p>
        </div>
      </div>
    </div>
  )
}

export default SideBar 