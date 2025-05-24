import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * 搜索输入组件
 */
const SearchInput = ({ keyword = '' }) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState(keyword)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <div className='modern-card p-6'>
      <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
        搜索文章
      </h3>
      <form onSubmit={handleSearch} className='relative'>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='输入关键词搜索文章...'
          className='modern-search w-full pl-12 pr-16'
        />
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
          <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </div>
        <button
          type='submit'
          className='absolute inset-y-0 right-0 pr-4 flex items-center text-blue-500 hover:text-blue-600 transition-colors'
        >
          搜索
        </button>
      </form>
    </div>
  )
}

export default SearchInput 