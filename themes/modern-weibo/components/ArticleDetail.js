import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * 文章详情组件
 */
const ArticleDetail = ({ post, lock, validPassword, className = '' }) => {
  if (!post) return null

  return (
    <article className={`modern-article ${className}`}>
      {/* 文章头部 */}
      <header className='mb-8'>
        {/* 分类标签 */}
        {post.category && (
          <div className='mb-4'>
            <Link href={`/category/${post.category}`} className='modern-category'>
              {post.category}
            </Link>
          </div>
        )}

        {/* 文章标题 */}
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
          {post.title}
        </h1>

        {/* 文章元信息 */}
        <div className='flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6'>
          {/* 发布日期 */}
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
            <time dateTime={post.publishDay}>
              {formatDateFmt(post.publishDay, siteConfig('MODERN_WEIBO_POST_DATE_FORMAT', null, CONFIG))}
            </time>
          </div>

          {/* 阅读时间 */}
          {post.wordCount && (
            <div className='flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span>{Math.ceil(post.wordCount / 200)} 分钟阅读</span>
            </div>
          )}

          {/* 字数统计 */}
          {post.wordCount && (
            <div className='flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
              <span>{post.wordCount} 字</span>
            </div>
          )}

          {/* 浏览量 */}
          {siteConfig('MODERN_WEIBO_VIEW_COUNT', null, CONFIG) && (
            <div className='flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
              </svg>
              <span>999 浏览</span>
            </div>
          )}
        </div>

        {/* 文章摘要 */}
        {post.summary && (
          <div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6'>
            <p className='text-gray-700 dark:text-gray-300 italic'>
              {post.summary}
            </p>
          </div>
        )}

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-6'>
            {post.tags.map(tag => (
              <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className='modern-tag'>
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* 文章内容 */}
      {!lock ? (
        <div className='prose prose-lg max-w-none dark:prose-invert'>
          <NotionPage post={post} />
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='mb-6'>
            <svg className='w-16 h-16 mx-auto text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>
            文章已加密
          </h3>
          <p className='text-gray-600 dark:text-gray-400'>
            请输入密码查看文章内容
          </p>
        </div>
      )}

      {/* 文章底部信息 */}
      <footer className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-500'>
            最后更新: {formatDateFmt(post.lastEditedDay || post.publishDay, 'YYYY-MM-DD')}
          </div>
          
          {/* 社交分享按钮 */}
          {siteConfig('MODERN_WEIBO_SOCIAL_SHARE', null, CONFIG) && (
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-500'>分享到:</span>
              <div className='flex space-x-2'>
                <button className='p-2 text-gray-400 hover:text-blue-500 transition-colors' title='分享到微博'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M9.586 21.586a2 2 0 002.828 0L22 12l-9.586-9.586a2 2 0 00-2.828 0L0 12l9.586 9.586z'/>
                  </svg>
                </button>
                <button className='p-2 text-gray-400 hover:text-green-500 transition-colors' title='分享到微信'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
                  </svg>
                </button>
                <button className='p-2 text-gray-400 hover:text-blue-600 transition-colors' title='复制链接'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </footer>
    </article>
  )
}

export default ArticleDetail 