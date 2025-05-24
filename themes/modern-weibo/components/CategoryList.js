import Link from 'next/link'

/**
 * 分类列表组件
 */
const CategoryList = ({ categoryOptions }) => {
  if (!categoryOptions || categoryOptions.length === 0) {
    return (
      <div className='text-center py-12 text-gray-500'>
        暂无分类
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {categoryOptions.map((category, index) => (
        <Link
          key={index}
          href={`/category/${category.name}`}
          className='modern-card p-6 hover:shadow-lg transition-all duration-300 group'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors'>
                  {category.name}
                </h3>
                <p className='text-sm text-gray-500'>
                  {category.count} 篇文章
                </p>
              </div>
            </div>
            <svg className='w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList 