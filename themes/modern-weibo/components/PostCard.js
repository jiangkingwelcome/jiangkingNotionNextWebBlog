import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * Social Gaming App 风格文章卡片组件
 */
const PostCard = ({ post, compact = false }) => {
  if (!post) return null

  const showSummary = siteConfig('MODERN_WEIBO_POST_EXCERPT_ENABLE', null, CONFIG)
  const showCover = siteConfig('MODERN_WEIBO_POST_COVER_ENABLE', null, CONFIG)

  return (
    <article className={`modern-post-card group ${compact ? 'p-6' : 'p-8'}`}>
      {/* 文章标题 */}
      <div className='mb-6'>
        <Link href={`/${post.slug}`} className='block'>
          <h2 className={`modern-post-title hover:text-pink-400 transition-colors duration-300 ${compact ? 'text-lg' : 'text-2xl'}`}>
            {post.title}
          </h2>
        </Link>
      </div>

      {/* 文章封面 */}
      {showCover && post.pageCoverThumbnail && !compact && (
        <div className='mb-6 overflow-hidden rounded-xl'>
          <Link href={`/${post.slug}`}>
            <img 
              src={post.pageCoverThumbnail} 
              alt={post.title}
              className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 border border-gray-600 rounded-xl'
            />
          </Link>
        </div>
      )}

      {/* 文章摘要 */}
      {showSummary && post.summary && (
        <div className='mb-6'>
          <p className='text-gray-200 leading-relaxed text-base'>
            {post.summary}
          </p>
        </div>
      )}

      {/* 文章元信息 */}
      <div className='flex flex-wrap items-center gap-4 text-sm mb-6'>
        {/* 发布日期 */}
        <div className='modern-post-meta-item'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          <span className='font-mono text-xs'>
            {formatDateFmt(post.publishDate, siteConfig('MODERN_WEIBO_POST_DATE_FORMAT', null, CONFIG))}
          </span>
        </div>

        {/* 分类 */}
        {post.category && (
          <Link 
            href={`/category/${post.category}`} 
            className='modern-category text-xs px-3 py-1'
          >
            {post.category}
          </Link>
        )}

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {post.tags.slice(0, 3).map(tag => (
              <Link 
                key={tag} 
                href={`/tag/${tag}`} 
                className='modern-tag text-xs px-2 py-1'
              >
                #{tag}
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className='text-gray-500 text-xs'>
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* 社交互动栏 */}
      {siteConfig('MODERN_WEIBO_SOCIAL_SHARE', null, CONFIG) && !compact && (
        <div className='pt-6 border-t border-gray-700'>
          {/* 移动端布局 - 垂直排列 */}
          <div className='md:hidden space-y-4'>
            {/* 互动按钮 - 2x2网格 */}
            <div className='grid grid-cols-2 gap-3'>
              {/* 点赞按钮 */}
              {siteConfig('MODERN_WEIBO_LIKE_BUTTON', null, CONFIG) && (
                <button className='social-like-btn flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-500/30 hover:border-red-500 transition-all duration-300 group bg-red-500/10 hover:bg-red-500'>
                  <svg className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                  </svg>
                  <span className='text-sm font-semibold'>Like</span>
                  <span className='text-xs bg-red-500/20 px-1.5 py-0.5 rounded-full'>12</span>
                </button>
              )}

              {/* 评论按钮 */}
              <Link 
                href={`/${post.slug}#comments`} 
                className='social-comment-btn flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-all duration-300 group bg-blue-500/10 hover:bg-blue-500'
              >
                <svg className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                <span className='text-sm font-semibold'>Comment</span>
                <span className='text-xs bg-blue-500/20 px-1.5 py-0.5 rounded-full'>5</span>
              </Link>

              {/* 分享按钮 */}
              <button className='social-share-btn flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-green-500/30 hover:border-green-500 transition-all duration-300 group bg-green-500/10 hover:bg-green-500'>
                <svg className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
                </svg>
                <span className='text-sm font-semibold'>Share</span>
              </button>

              {/* 收藏按钮 */}
              <button className='flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-pink-500/30 hover:border-pink-500 transition-all duration-300 group bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white'>
                <svg className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' />
                </svg>
                <span className='text-sm font-semibold'>Save</span>
              </button>
            </div>

            {/* 统计信息 - 移动端 */}
            <div className='flex items-center justify-between gap-4'>
              {/* 浏览计数 */}
              {siteConfig('MODERN_WEIBO_VIEW_COUNT', null, CONFIG) && (
                <div className='flex items-center gap-2 text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-600 flex-1'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                  </svg>
                  <span className='text-xs font-mono'>
                    {post.count?.view || Math.floor(Math.random() * 1000) + 100} views
                  </span>
                </div>
              )}

              {/* 游戏化得分 */}
              <div className='flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-2 rounded-lg border border-yellow-400/30'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
                <span className='text-xs font-mono font-bold'>
                  {Math.floor(Math.random() * 500) + 50} XP
                </span>
              </div>
            </div>
          </div>

          {/* 桌面端布局 - 水平排列 */}
          <div className='hidden md:flex items-center justify-between'>
            {/* 左侧互动按钮 */}
            <div className='flex items-center gap-8'>
              {/* 点赞按钮 - 使用红色主题 */}
              {siteConfig('MODERN_WEIBO_LIKE_BUTTON', null, CONFIG) && (
                <button className='social-like-btn flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/30 hover:border-red-500 transition-all duration-300 group bg-red-500/10 hover:bg-red-500'>
                  <svg className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                  </svg>
                  <span className='text-sm font-semibold'>Like</span>
                  <span className='text-xs bg-red-500/20 px-2 py-1 rounded-full'>12</span>
                </button>
              )}

              {/* 评论按钮 - 使用蓝色主题 */}
              <Link 
                href={`/${post.slug}#comments`} 
                className='social-comment-btn flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-all duration-300 group bg-blue-500/10 hover:bg-blue-500'
              >
                <svg className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                <span className='text-sm font-semibold'>Comment</span>
                <span className='text-xs bg-blue-500/20 px-2 py-1 rounded-full'>5</span>
              </Link>

              {/* 分享按钮 - 使用绿色主题 */}
              <button className='social-share-btn flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500/30 hover:border-green-500 transition-all duration-300 group bg-green-500/10 hover:bg-green-500'>
                <svg className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
                </svg>
                <span className='text-sm font-semibold'>Share</span>
              </button>

              {/* 收藏按钮 - 使用粉色主题 */}
              <button className='flex items-center gap-2 px-3 py-2 rounded-lg border border-pink-500/30 hover:border-pink-500 transition-all duration-300 group bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white'>
                <svg className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' />
                </svg>
                <span className='text-sm font-semibold'>Save</span>
              </button>
            </div>

            {/* 右侧浏览计数和游戏化元素 */}
            <div className='flex items-center gap-4'>
              {/* 浏览计数 */}
              {siteConfig('MODERN_WEIBO_VIEW_COUNT', null, CONFIG) && (
                <div className='flex items-center gap-2 text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-600'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                  </svg>
                  <span className='text-xs font-mono'>
                    {post.count?.view || Math.floor(Math.random() * 1000) + 100} views
                  </span>
                </div>
              )}

              {/* 游戏化得分 */}
              <div className='flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-2 rounded-lg border border-yellow-400/30'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
                <span className='text-xs font-mono font-bold'>
                  {Math.floor(Math.random() * 500) + 50} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 阅读更多按钮 */}
      {!compact && (
        <div className='mt-8'>
          <Link 
            href={`/${post.slug}`} 
            className='modern-btn-outline inline-flex items-center gap-3 hover:gap-4 transition-all duration-300 text-base font-semibold'
          >
            <span>阅读全文</span>
            <div className='flex items-center'>
              <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </div>
          </Link>
        </div>
      )}
    </article>
  )
}

export default PostCard 