import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'

/**
 * 归档列表组件
 */
const ArchiveList = ({ archivePosts }) => {
  if (!archivePosts || Object.keys(archivePosts).length === 0) {
    return (
      <div className='text-center py-12 text-gray-500'>
        暂无归档文章
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      {Object.keys(archivePosts).map(year => (
        <div key={year}>
          <div className='flex items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{year}</h2>
            <div className='flex-1 ml-4 border-t border-gray-200 dark:border-gray-700'></div>
            <span className='ml-4 text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full'>
              {archivePosts[year].length} 篇
            </span>
          </div>
          
          <div className='space-y-4'>
            {archivePosts[year].map((post, index) => (
              <div key={index} className='flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group'>
                <div className='flex-shrink-0 w-16 text-sm text-gray-500 text-right'>
                  {formatDateFmt(post.publishDay, 'MM-DD')}
                </div>
                <div className='flex-1 min-w-0'>
                  <Link 
                    href={`/${post.slug}`}
                    className='block group-hover:text-blue-500 transition-colors'
                  >
                    <h3 className='font-medium text-gray-800 dark:text-white line-clamp-1 mb-1'>
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className='text-sm text-gray-500 line-clamp-2'>
                        {post.summary}
                      </p>
                    )}
                  </Link>
                  
                  {/* 标签 */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {post.tags.slice(0, 3).map(tag => (
                        <Link
                          key={tag}
                          href={`/tag/${encodeURIComponent(tag)}`}
                          className='text-xs text-gray-400 hover:text-blue-500 transition-colors'
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* 分类 */}
                {post.category && (
                  <div className='flex-shrink-0'>
                    <Link
                      href={`/category/${post.category}`}
                      className='text-xs text-gray-400 hover:text-blue-500 transition-colors border border-gray-200 dark:border-gray-600 px-2 py-1 rounded'
                    >
                      {post.category}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArchiveList 