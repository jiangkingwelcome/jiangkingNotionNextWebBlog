import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 分页组件
 */
const PostList = ({ page, totalPages }) => {
  const router = useRouter()
  const currentPage = parseInt(page) || 1
  
  if (totalPages <= 1) return null

  const generatePageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const getPageUrl = (pageNum) => {
    const { pathname, query } = router
    const newQuery = { ...query, page: pageNum }
    
    if (pageNum === 1) {
      delete newQuery.page
    }

    const queryString = Object.keys(newQuery)
      .map(key => `${key}=${newQuery[key]}`)
      .join('&')

    return `${pathname}${queryString ? `?${queryString}` : ''}`
  }

  const pages = generatePageNumbers()

  return (
    <nav className='flex items-center justify-center space-x-2'>
      {/* 上一页 */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className='modern-btn-outline px-3 py-2 text-sm'
        >
          上一页
        </Link>
      )}

      {/* 第一页 */}
      {pages[0] > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className='px-3 py-2 text-sm text-gray-700 hover:text-blue-500 transition-colors'
          >
            1
          </Link>
          {pages[0] > 2 && (
            <span className='px-2 text-gray-400'>...</span>
          )}
        </>
      )}

      {/* 页码 */}
      {pages.map(pageNum => (
        <Link
          key={pageNum}
          href={getPageUrl(pageNum)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            pageNum === currentPage
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {/* 最后一页 */}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className='px-2 text-gray-400'>...</span>
          )}
          <Link
            href={getPageUrl(totalPages)}
            className='px-3 py-2 text-sm text-gray-700 hover:text-blue-500 transition-colors'
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* 下一页 */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className='modern-btn px-3 py-2 text-sm'
        >
          下一页
        </Link>
      )}
    </nav>
  )
}

export default PostList 