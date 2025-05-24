import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题组件
const Header = dynamic(() => import('./components/Header'), { ssr: false })
const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false })
const SideBar = dynamic(() => import('./components/SideBar'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const PostCard = dynamic(() => import('./components/PostCard'), { ssr: false })
const PostList = dynamic(() => import('./components/PostList'), { ssr: false })
const ArticleDetail = dynamic(() => import('./components/ArticleDetail'), { ssr: false })
const SearchInput = dynamic(() => import('./components/SearchInput'), { ssr: false })
const CategoryList = dynamic(() => import('./components/CategoryList'), { ssr: false })
const TagList = dynamic(() => import('./components/TagList'), { ssr: false })
const ArchiveList = dynamic(() => import('./components/ArchiveList'), { ssr: false })
const BackToTop = dynamic(() => import('./components/BackToTop'), { ssr: false })
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ShareBar = dynamic(() => import('@/components/ShareBar'), { ssr: false })

// 主题全局状态
const ThemeGlobalModernWeibo = createContext()
export const useModernWeiboGlobal = () => useContext(ThemeGlobalModernWeibo)

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)

  return (
    <ThemeGlobalModernWeibo.Provider value={{ searchModal }}>
      <div
        id='theme-modern-weibo'
        className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col`}>
        <Style />

        {/* 头部 */}
        <Header {...props} />

        {/* 导航栏 */}
        <NavBar {...props} />

        {/* 主要内容区域 */}
        <main className='flex-1'>
          <div className='modern-container'>
            <div className='flex flex-col lg:flex-row gap-8 py-8'>
              {/* 主内容区 */}
              <div className={`flex-1 ${fullWidth ? 'max-w-full' : 'max-w-4xl'}`}>
                <Transition
                  show={!onLoading}
                  appear={true}
                  enter='transition ease-in-out duration-700 transform'
                  enterFrom='opacity-0 translate-y-8'
                  enterTo='opacity-100'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 -translate-y-8'
                  unmount={false}>
                  {slotTop}
                  <div className='modern-fade-in'>
                    {children}
                  </div>
                </Transition>
              </div>

              {/* 桌面端侧边栏 */}
              {!fullWidth && siteConfig('MODERN_WEIBO_SIDEBAR_ENABLE', null, CONFIG) && (
                <aside className='hidden lg:block modern-sidebar'>
                  <SideBar {...props} />
                </aside>
              )}
            </div>

            {/* 移动端侧边栏 - 在主内容下方显示 */}
            {!fullWidth && siteConfig('MODERN_WEIBO_SIDEBAR_ENABLE', null, CONFIG) && (
              <div className='lg:hidden py-8'>
                <SideBar {...props} />
              </div>
            )}
          </div>
        </main>

        {/* 页脚 */}
        <Footer {...props} />

        {/* 回到顶部按钮 */}
        <BackToTop />

        {/* 搜索框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalModernWeibo.Provider>
  )
}

/**
 * 博客首页
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  const { posts, page, totalPages } = props
  
  console.log('LayoutPostList props:', { posts: posts?.length, page, totalPages })
  
  // 如果没有文章数据，显示友好提示
  if (!posts || posts.length === 0) {
    return (
      <div className='space-y-6'>
        {/* 社交游戏风格欢迎卡片 */}
        <div className='modern-card p-10 text-center'>
          <div className='mb-8'>
            <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50'>
              <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253' />
              </svg>
            </div>
            <h2 className='text-4xl font-bold text-white mb-4'>
              🎮 欢迎来到社交科技博客
            </h2>
            <p className='text-gray-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed'>
              探索前沿技术，分享编程智慧，连接全球开发者社区。在这里，每一次学习都是一场冒险！
            </p>
          </div>
          
          {/* 游戏化状态面板 */}
          <div className='bg-gradient-to-r from-pink-500/10 via-blue-500/10 to-green-500/10 rounded-xl p-8 mb-8 border border-pink-500/20'>
            <h3 className='text-2xl font-semibold text-pink-400 mb-6 flex items-center justify-center gap-3'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
              社区状态面板
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-lg p-6 border border-pink-500/30 hover:border-pink-400 transition-all duration-300 group'>
                <div className='text-3xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform'>∞</div>
                <div className='text-white font-semibold mb-1'>无限创意</div>
                <div className='text-gray-400 text-sm'>Infinite Ideas</div>
              </div>
              <div className='bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg p-6 border border-green-500/30 hover:border-green-400 transition-all duration-300 group'>
                <div className='text-3xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform'>LIVE</div>
                <div className='text-white font-semibold mb-1'>实时在线</div>
                <div className='text-gray-400 text-sm'>System Online</div>
              </div>
              <div className='bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 group'>
                <div className='text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform'>24/7</div>
                <div className='text-white font-semibold mb-1'>全天候</div>
                <div className='text-gray-400 text-sm'>Always Active</div>
              </div>
              <div className='bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-6 border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 group'>
                <div className='text-3xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform'>LV∞</div>
                <div className='text-white font-semibold mb-1'>等级满级</div>
                <div className='text-gray-400 text-sm'>Max Level</div>
              </div>
            </div>
          </div>

          {/* 社交游戏风格快速导航 */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
            <Link href='/category' className='group relative bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20'>
              <div className='absolute top-2 right-2'>
                <div className='w-3 h-3 bg-blue-400 rounded-full animate-pulse'></div>
              </div>
              <div className='text-blue-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300'>📚</div>
              <div className='text-white font-bold text-lg mb-1'>分类浏览</div>
              <div className='text-gray-400 text-sm mb-3'>Explore Topics</div>
              <div className='flex items-center gap-2 text-blue-400 text-xs font-mono'>
                <span>+50 XP</span>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
            </Link>
            
            <Link href='/tag' className='group relative bg-gradient-to-br from-green-500/10 to-cyan-600/10 p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20'>
              <div className='absolute top-2 right-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              </div>
              <div className='text-green-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300'>🏷️</div>
              <div className='text-white font-bold text-lg mb-1'>标签筛选</div>
              <div className='text-gray-400 text-sm mb-3'>Filter Tags</div>
              <div className='flex items-center gap-2 text-green-400 text-xs font-mono'>
                <span>+30 XP</span>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
            </Link>
            
            <Link href='/archive' className='group relative bg-gradient-to-br from-purple-500/10 to-pink-600/10 p-6 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20'>
              <div className='absolute top-2 right-2'>
                <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
              </div>
              <div className='text-purple-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300'>📁</div>
              <div className='text-white font-bold text-lg mb-1'>时间归档</div>
              <div className='text-gray-400 text-sm mb-3'>Timeline</div>
              <div className='flex items-center gap-2 text-purple-400 text-xs font-mono'>
                <span>+40 XP</span>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
            </Link>
            
            <div className='group relative bg-gradient-to-br from-red-500/10 to-orange-600/10 p-6 rounded-xl border border-red-500/30 cursor-pointer hover:border-red-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20'>
              <div className='absolute top-2 right-2'>
                <div className='w-3 h-3 bg-red-400 rounded-full animate-pulse'></div>
              </div>
              <div className='text-red-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300'>🔥</div>
              <div className='text-white font-bold text-lg mb-1'>热门内容</div>
              <div className='text-gray-400 text-sm mb-3'>Coming Soon</div>
              <div className='flex items-center gap-2 text-red-400 text-xs font-mono'>
                <span>+100 XP</span>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
            </div>
          </div>
          
          {/* 社交互动提示 */}
          <div className='bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-500/20'>
            <div className='flex items-center justify-center gap-4 mb-4'>
              <div className='flex items-center gap-2 text-pink-400'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
                <span className='font-semibold'>Social</span>
              </div>
              <div className='flex items-center gap-2 text-blue-400'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                <span className='font-semibold'>Share</span>
              </div>
              <div className='flex items-center gap-2 text-green-400'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
                </svg>
                <span className='font-semibold'>Connect</span>
              </div>
            </div>
            <p className='text-gray-300 text-sm'>
              💡 管理员提示：如果您是博客管理员，请检查 Notion 数据库连接是否正常。<br/>
              连接成功后，这里将显示您的精彩内容！
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className='space-y-6'>
      {/* 文章列表 */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {/* 分页 */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-12'>
          <PostList page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword, posts } = props

  useEffect(() => {
    if (isBrowser && keyword) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'bg-yellow-200 text-yellow-800 px-1 rounded'
        }
      })
    }
  }, [keyword])

  const slotTop = siteConfig('ALGOLIA_APP_ID') ? null : (
    <div className='mb-8'>
      <SearchInput {...props} />
    </div>
  )

  return (
    <div id='posts-wrapper'>
      {slotTop}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
          搜索结果: "{keyword}"
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          找到 {posts?.length || 0} 篇相关文章
        </p>
      </div>
      <LayoutPostList {...props} />
    </div>
  )
}

/**
 * 归档页
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  
  return (
    <div className='modern-card p-8'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-white'>
        文章归档
      </h1>
      <ArchiveList archivePosts={archivePosts} />
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props
  const { fullWidth } = useGlobal()

  return (
    <div className='space-y-8'>
      {/* 文章内容 */}
      <ArticleDetail 
        post={post} 
        lock={lock} 
        validPassword={validPassword}
        className={fullWidth ? 'max-w-full' : 'max-w-4xl'}
      />

      {/* 分享栏 */}
      {siteConfig('MODERN_WEIBO_ARTICLE_SHARE_BAR', null, CONFIG) && (
        <div className='modern-card p-6'>
          <ShareBar post={post} />
        </div>
      )}

      {/* 相邻文章导航 */}
      {(prev || next) && (
        <div className='modern-card p-6'>
          <div className='flex justify-between items-center'>
            {prev && (
              <Link href={`/${prev.slug}`} className='modern-btn-outline'>
                ← {prev.title}
              </Link>
            )}
            {next && (
              <Link href={`/${next.slug}`} className='modern-btn-outline ml-auto'>
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 推荐文章 */}
      {siteConfig('MODERN_WEIBO_ARTICLE_RECOMMEND_POSTS', null, CONFIG) && recommendPosts?.length > 0 && (
        <div className='modern-card p-6'>
          <h3 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
            推荐阅读
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {recommendPosts.slice(0, 4).map(post => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </div>
      )}

      {/* 评论区 */}
      <div className='modern-card p-6'>
        <Comment frontMatter={post} />
      </div>
    </div>
  )
}

/**
 * 404页面
 */
const Layout404 = props => {
  const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isBrowser && !document.getElementById('notion-article')) {
        router.push('/404')
      }
    }, siteConfig('POST_WAITING_TIME_FOR_404') * 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='modern-card p-12 text-center'>
      <div className='text-6xl font-bold text-gray-300 mb-4'>404</div>
      <h1 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
        页面未找到
      </h1>
      <p className='text-gray-600 dark:text-gray-400 mb-8'>
        抱歉，您访问的页面不存在或已被删除。
      </p>
      <Link href='/' className='modern-btn'>
        返回首页
      </Link>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  
  return (
    <div className='modern-card p-8'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-white'>
        文章分类
      </h1>
      <CategoryList categoryOptions={categoryOptions} />
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  
  return (
    <div className='modern-card p-8'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-white'>
        标签云
      </h1>
      <TagList tagOptions={tagOptions} />
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
} 