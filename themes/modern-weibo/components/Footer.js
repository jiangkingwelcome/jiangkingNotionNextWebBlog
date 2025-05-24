import { siteConfig } from '@/lib/config'
import Link from 'next/link'

/**
 * 现代微博风格页脚组件
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()
  const since = siteConfig('SINCE') || currentYear

  return (
    <footer className='modern-footer'>
      <div className='modern-container'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* 站点信息 */}
          <div className='md:col-span-2'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white mb-4'>
              {siteConfig('TITLE')}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              {siteConfig('DESCRIPTION')}
            </p>
            <div className='text-xs text-gray-500'>
              © {since === currentYear ? currentYear : `${since}-${currentYear}`} {siteConfig('AUTHOR')}
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className='font-semibold text-gray-800 dark:text-white mb-4'>快速链接</h4>
            <div className='space-y-2 text-sm'>
              <Link href='/' className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                首页
              </Link>
              <Link href='/archive' className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                归档
              </Link>
              <Link href='/category' className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                分类
              </Link>
              <Link href='/tag' className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                标签
              </Link>
            </div>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className='font-semibold text-gray-800 dark:text-white mb-4'>联系我</h4>
            <div className='space-y-2 text-sm'>
              {siteConfig('CONTACT_EMAIL') && (
                <a 
                  href={`mailto:${siteConfig('CONTACT_EMAIL')}`}
                  className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'
                >
                  邮箱
                </a>
              )}
              {siteConfig('CONTACT_GITHUB') && (
                <a 
                  href={siteConfig('CONTACT_GITHUB')}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'
                >
                  GitHub
                </a>
              )}
              {siteConfig('CONTACT_TWITTER') && (
                <a 
                  href={siteConfig('CONTACT_TWITTER')}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className='pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col md:flex-row items-center justify-between text-sm text-gray-500'>
            <div className='mb-4 md:mb-0'>
              <span>Powered by </span>
              <a 
                href='https://github.com/tangly1024/NotionNext' 
                target='_blank' 
                rel='noopener noreferrer'
                className='text-blue-500 hover:text-blue-600 transition-colors'
              >
                NotionNext
              </a>
              <span> & </span>
              <a 
                href='https://notion.so' 
                target='_blank' 
                rel='noopener noreferrer'
                className='text-blue-500 hover:text-blue-600 transition-colors'
              >
                Notion
              </a>
            </div>
            
            {/* 备案信息 */}
            {siteConfig('BEI_AN') && (
              <div>
                <a 
                  href='https://beian.miit.gov.cn/' 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:text-gray-600 transition-colors'
                >
                  {siteConfig('BEI_AN')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 