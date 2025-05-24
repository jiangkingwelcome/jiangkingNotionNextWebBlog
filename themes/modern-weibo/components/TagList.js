import Link from 'next/link'

/**
 * 标签列表组件
 */
const TagList = ({ tagOptions }) => {
  if (!tagOptions || tagOptions.length === 0) {
    return (
      <div className='text-center py-12 text-gray-500'>
        暂无标签
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {tagOptions.map((tag, index) => {
        // 根据文章数量计算标签大小
        const getTagSize = (count) => {
          if (count >= 10) return 'text-lg px-4 py-3'
          if (count >= 5) return 'text-base px-3 py-2'
          return 'text-sm px-3 py-2'
        }

        return (
          <Link
            key={index}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className={`modern-tag hover:scale-110 transform transition-all duration-200 ${getTagSize(tag.count)}`}
            title={`${tag.count} 篇文章`}
          >
            #{tag.name} {tag.count && <span className='ml-1 text-xs opacity-75'>({tag.count})</span>}
          </Link>
        )
      })}
    </div>
  )
}

export default TagList 