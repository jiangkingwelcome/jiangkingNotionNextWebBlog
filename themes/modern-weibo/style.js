/**
 * 这里的样式将同时影响PC和移动端
 * 移动端css在globals.css中另外定义
 * 这里就不重复写了
 */
export const Style = () => {
  return (
    <style jsx global>{`
      /* Social Gaming App 全局样式 */
      #theme-modern-weibo {
        background: #050305;
        background-image: 
          radial-gradient(circle at 20% 80%, rgba(222, 85, 207, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(242, 9, 33, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(58, 91, 173, 0.1) 0%, transparent 50%);
        background-size: 500px 500px, 400px 400px, 600px 600px;
        background-position: 0 0, 100% 100%, 50% 50%;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #FFFFFF;
        overflow-x: hidden;
      }

      /* 细微的网格背景 */
      #theme-modern-weibo::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          linear-gradient(rgba(222, 85, 207, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(222, 85, 207, 0.03) 1px, transparent 1px);
        background-size: 30px 30px;
        pointer-events: none;
        z-index: -1;
        animation: socialMove 60s linear infinite;
      }

      @keyframes socialMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(30px, 30px); }
      }

      /* 社交卡片基础样式 */
      .modern-card {
        background: linear-gradient(145deg, #1A1A1A, #0F0F0F);
        border-radius: 16px;
        border: 1px solid #2A2A2A;
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.03);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .modern-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(222, 85, 207, 0.1), transparent);
        transition: left 0.6s;
      }

      .modern-card:hover::before {
        left: 100%;
      }

      .modern-card:hover {
        border-color: #DE55CF;
        box-shadow: 
          0 16px 48px rgba(0, 0, 0, 0.6),
          0 0 30px rgba(222, 85, 207, 0.2),
          inset 0 1px 0 rgba(222, 85, 207, 0.1);
        transform: translateY(-4px) scale(1.01);
      }

      /* 主容器 */
      .modern-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
      }

      /* 隐藏滚动条 */
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      /* 社交头部 */
      .modern-header {
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(15, 15, 15, 0.95));
        backdrop-filter: blur(20px) saturate(180%);
        border-bottom: 1px solid #2A2A2A;
        border-image: linear-gradient(90deg, transparent, #DE55CF, transparent) 1;
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .modern-logo {
        font-weight: 700;
        font-size: 24px;
        background: linear-gradient(135deg, #DE55CF, #F20921, #3A5BAD);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-decoration: none;
        text-shadow: 0 0 10px rgba(222, 85, 207, 0.3);
        animation: socialGlow 3s ease-in-out infinite alternate;
      }

      @keyframes socialGlow {
        from { filter: brightness(1); }
        to { filter: brightness(1.2); }
      }

      /* 社交导航 */
      .modern-nav {
        display: flex;
        gap: 32px;
        align-items: center;
      }

      .modern-nav-item {
        color: #E0E0E0;
        text-decoration: none;
        font-weight: 500;
        padding: 10px 16px;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
        border: 1px solid transparent;
      }

      .modern-nav-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 8px;
        background: linear-gradient(45deg, #DE55CF, #F20921);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .modern-nav-item:hover {
        color: #FFFFFF;
        transform: translateY(-2px);
      }

      .modern-nav-item:hover::before {
        opacity: 1;
      }

      .modern-nav-item.active {
        color: #DE55CF;
        border-color: #DE55CF;
        box-shadow: 0 0 15px rgba(222, 85, 207, 0.4);
      }

      /* 社交文章卡片 */
      .modern-post-card {
        background: linear-gradient(145deg, #1A1A1A, #0F0F0F);
        border-radius: 20px;
        padding: 32px;
        margin-bottom: 32px;
        border: 1px solid #2A2A2A;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .modern-post-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #DE55CF, #F20921, #3A5BAD, #8BAB8A);
        background-size: 400% 100%;
        animation: socialBorderGlow 4s linear infinite;
      }

      @keyframes socialBorderGlow {
        0% { background-position: 0% 50%; }
        100% { background-position: 400% 50%; }
      }

      .modern-post-card:hover {
        transform: translateY(-6px) scale(1.01);
        border-color: #DE55CF;
        box-shadow: 
          0 24px 64px rgba(0, 0, 0, 0.6),
          0 0 40px rgba(222, 85, 207, 0.3);
      }

      .modern-post-title {
        font-size: 24px;
        font-weight: 700;
        color: #FFFFFF;
        line-height: 1.4;
        margin-bottom: 16px;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .modern-post-title:hover {
        color: #DE55CF;
        text-shadow: 0 0 10px rgba(222, 85, 207, 0.5);
        transform: translateX(4px);
      }

      .modern-post-excerpt {
        color: #E0E0E0;
        line-height: 1.8;
        margin-bottom: 24px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 16px;
      }

      .modern-post-meta {
        display: flex;
        align-items: center;
        gap: 24px;
        color: #A0A0A0;
        font-size: 14px;
        font-family: 'SF Mono', Monaco, monospace;
      }

      .modern-post-meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: rgba(222, 85, 207, 0.1);
        border-radius: 6px;
        border: 1px solid rgba(222, 85, 207, 0.2);
        color: #E0E0E0;
        transition: all 0.3s ease;
      }

      .modern-post-meta-item:hover {
        background: rgba(222, 85, 207, 0.2);
        border-color: rgba(222, 85, 207, 0.4);
      }

      /* 社交头像 */
      .modern-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #DE55CF;
        box-shadow: 
          0 0 20px rgba(222, 85, 207, 0.4),
          inset 0 0 20px rgba(222, 85, 207, 0.1);
        animation: socialAvatarPulse 3s ease-in-out infinite;
      }

      @keyframes socialAvatarPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(222, 85, 207, 0.4); }
        50% { box-shadow: 0 0 30px rgba(222, 85, 207, 0.7); }
      }

      /* 社交标签 */
      .modern-tag {
        background: linear-gradient(135deg, rgba(222, 85, 207, 0.2), rgba(58, 91, 173, 0.2));
        color: #DE55CF;
        padding: 6px 12px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        border: 1px solid rgba(222, 85, 207, 0.3);
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .modern-tag:hover {
        background: linear-gradient(135deg, #DE55CF, #3A5BAD);
        color: #FFFFFF;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 20px rgba(222, 85, 207, 0.4);
      }

      /* 社交分类 */
      .modern-category {
        background: linear-gradient(135deg, rgba(242, 9, 33, 0.2), rgba(187, 53, 41, 0.2));
        color: #F20921;
        padding: 6px 12px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        border: 1px solid rgba(242, 9, 33, 0.3);
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .modern-category:hover {
        background: linear-gradient(135deg, #F20921, #BB3529);
        color: #FFFFFF;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 20px rgba(242, 9, 33, 0.4);
      }

      /* 社交侧边栏 */
      .modern-sidebar {
        width: 320px;
        padding-left: 32px;
      }

      .modern-sidebar-widget {
        background: linear-gradient(145deg, #1A1A1A, #0F0F0F);
        border-radius: 20px;
        padding: 32px;
        margin-bottom: 32px;
        border: 1px solid #2A2A2A;
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.03);
        position: relative;
      }

      .modern-sidebar-widget::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #DE55CF, transparent);
      }

      .modern-sidebar-title {
        font-size: 18px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid #2A2A2A;
        position: relative;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .modern-sidebar-title::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, #DE55CF, #F20921);
      }

      /* 社交按钮 */
      .modern-btn {
        background: linear-gradient(135deg, #DE55CF, #F20921);
        color: #FFFFFF;
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(222, 85, 207, 0.3);
      }

      .modern-btn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 8px 30px rgba(222, 85, 207, 0.5);
        filter: brightness(1.1);
      }

      .modern-btn-outline {
        background: transparent;
        color: #DE55CF;
        border: 2px solid #DE55CF;
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: 600;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-decoration: none;
      }

      .modern-btn-outline:hover {
        background: #DE55CF;
        color: #FFFFFF;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(222, 85, 207, 0.4);
      }

      /* 社交搜索框 */
      .modern-search {
        background: #1A1A1A;
        border: 2px solid #2A2A2A;
        border-radius: 12px;
        padding: 12px 20px;
        width: 100%;
        font-size: 14px;
        color: #FFFFFF;
        transition: all 0.3s ease;
      }

      .modern-search:focus {
        outline: none;
        border-color: #DE55CF;
        box-shadow: 0 0 20px rgba(222, 85, 207, 0.3);
        background: #252525;
      }

      .modern-search::placeholder {
        color: #A0A0A0;
      }

      /* 社交文章内容 */
      .modern-article {
        background: linear-gradient(145deg, #1A1A1A, #0F0F0F);
        border-radius: 20px;
        padding: 40px;
        border: 1px solid #2A2A2A;
        line-height: 1.8;
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.03);
        color: #FFFFFF;
      }

      .modern-article h1, .modern-article h2, .modern-article h3 {
        color: #FFFFFF;
        font-weight: 700;
        margin-top: 2em;
        margin-bottom: 1em;
      }

      .modern-article h1 {
        font-size: 36px;
        background: linear-gradient(135deg, #DE55CF, #F20921, #3A5BAD);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 30px rgba(222, 85, 207, 0.3);
        padding-bottom: 16px;
        border-bottom: 2px solid transparent;
        border-image: linear-gradient(90deg, #DE55CF, #F20921) 1;
      }

      .modern-article h2 {
        font-size: 28px;
        color: #DE55CF;
      }

      .modern-article h3 {
        font-size: 24px;
        color: #3A5BAD;
      }

      .modern-article p {
        color: #E0E0E0;
        margin-bottom: 1.5em;
      }

      .modern-article a {
        color: #DE55CF;
        text-decoration: none;
        border-bottom: 1px solid rgba(222, 85, 207, 0.3);
        transition: all 0.3s ease;
      }

      .modern-article a:hover {
        color: #F20921;
        border-bottom-color: #F20921;
        text-shadow: 0 0 10px rgba(242, 9, 33, 0.3);
      }

      /* 社交页脚 */
      .modern-footer {
        background: linear-gradient(135deg, #1A1A1A, #0F0F0F);
        border-top: 1px solid #2A2A2A;
        padding: 48px 0;
        margin-top: 80px;
        text-align: center;
        color: #E0E0E0;
        position: relative;
      }

      .modern-footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #DE55CF, transparent);
      }

      /* 社交动画 */
      .modern-fade-in {
        animation: socialFadeIn 1s ease-out;
      }

      @keyframes socialFadeIn {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* 社交滚动条 */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #1A1A1A;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #DE55CF, #F20921);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #F20921, #DE55CF);
      }

      /* 选中文本颜色 */
      ::selection {
        background: rgba(222, 85, 207, 0.3);
        color: #FFFFFF;
      }

      ::-moz-selection {
        background: rgba(222, 85, 207, 0.3);
        color: #FFFFFF;
      }

      /* 社交互动按钮样式 */
      .social-like-btn {
        color: #F20921;
      }

      .social-like-btn:hover {
        color: #FFFFFF;
        background: #F20921;
        box-shadow: 0 0 20px rgba(242, 9, 33, 0.5);
      }

      .social-comment-btn {
        color: #3A5BAD;
      }

      .social-comment-btn:hover {
        color: #FFFFFF;
        background: #3A5BAD;
        box-shadow: 0 0 20px rgba(58, 91, 173, 0.5);
      }

      .social-share-btn {
        color: #8BAB8A;
      }

      .social-share-btn:hover {
        color: #FFFFFF;
        background: #8BAB8A;
        box-shadow: 0 0 20px rgba(139, 171, 138, 0.5);
      }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .modern-container {
          padding: 0 16px;
        }
        
        .modern-post-card {
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .modern-post-title {
          font-size: 20px;
        }
        
        .modern-sidebar {
          width: 100%;
          padding-left: 0;
          margin-top: 0;
        }
        
        .modern-sidebar-widget {
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .modern-article {
          padding: 24px 20px;
        }
      }

      @media (max-width: 480px) {
        .modern-post-card,
        .modern-sidebar-widget,
        .modern-article {
          padding: 20px;
          margin-bottom: 20px;
        }

        .modern-post-title {
          font-size: 18px;
        }

        .modern-article h1 {
          font-size: 24px;
        }
        
        .modern-sidebar-widget {
          border-radius: 16px;
        }
      }

      /* 确保侧边栏文字可见 */
      .modern-sidebar-widget a {
        color: #E0E0E0;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .modern-sidebar-widget a:hover {
        color: #DE55CF;
      }

      .modern-sidebar-widget .text-sm {
        color: #A0A0A0;
      }

      .modern-sidebar-widget .text-gray-500 {
        color: #B0B0B0 !important;
      }

      .modern-sidebar-widget .text-gray-700 {
        color: #E0E0E0 !important;
      }

      .modern-sidebar-widget .text-gray-800 {
        color: #FFFFFF !important;
      }
    `}</style>
  )
} 