const CONFIG = {
  // 主题基础配置
  MODERN_WEIBO_LOGO_IMG: '/logo.webp',
  MODERN_WEIBO_LOGO_TEXT: 'Social Tech Blog',
  MODERN_WEIBO_AVATAR_SIZE: '48',
  
  // 顶部导航配置
  MODERN_WEIBO_TOP_BAR: true,
  MODERN_WEIBO_TOP_BAR_CONTENT: process.env.NEXT_PUBLIC_THEME_MODERN_WEIBO_TOP_TIPS || '🎮 欢迎来到现代社交科技博客 - 连接、分享、成长！',
  
  // 作者信息配置
  MODERN_WEIBO_AUTHOR_DESCRIPTION: process.env.NEXT_PUBLIC_THEME_MODERN_WEIBO_AUTHOR_DESCRIPTION || '🚀 创新者 | 技术分享者 | 社交连接者',
  MODERN_WEIBO_AUTHOR_LINK: process.env.NEXT_PUBLIC_AUTHOR_LINK || '#',
  
  // 卡片样式配置
  MODERN_WEIBO_CARD_SHADOW: true, // 卡片阴影效果
  MODERN_WEIBO_CARD_ROUNDED: 'xl', // 卡片圆角程度: sm, md, lg, xl, 2xl
  MODERN_WEIBO_CARD_BORDER: true, // 卡片边框
  MODERN_WEIBO_CARD_GLOW: true, // 霓虹发光效果
  
  // 文章列表配置
  MODERN_WEIBO_POST_COVER_ENABLE: true, // 是否显示文章封面
  MODERN_WEIBO_POST_EXCERPT_ENABLE: true, // 是否显示文章摘要
  MODERN_WEIBO_POST_DATE_FORMAT: 'MM.DD.YYYY', // 日期格式（现代风格）
  MODERN_WEIBO_POST_AD_ENABLE: false, // 文章列表广告
  
  // 文章详情配置
  MODERN_WEIBO_ARTICLE_RECOMMEND_POSTS: true, // 文章底部推荐
  MODERN_WEIBO_ARTICLE_SHARE_BAR: true, // 分享栏
  MODERN_WEIBO_ARTICLE_TOC: true, // 目录
  
  // 侧边栏配置
  MODERN_WEIBO_SIDEBAR_ENABLE: true,
  MODERN_WEIBO_SIDEBAR_POSITION: 'right', // left, right
  MODERN_WEIBO_SIDEBAR_WIDTH: '320', // 侧边栏宽度(px)
  
  // 菜单配置
  MODERN_WEIBO_MENU_CATEGORY: true, // 显示分类
  MODERN_WEIBO_MENU_TAG: true, // 显示标签
  MODERN_WEIBO_MENU_ARCHIVE: true, // 显示归档
  MODERN_WEIBO_MENU_SEARCH: true, // 显示搜索
  
  // 社交功能配置
  MODERN_WEIBO_SOCIAL_SHARE: true, // 社交分享
  MODERN_WEIBO_LIKE_BUTTON: true, // 点赞按钮
  MODERN_WEIBO_VIEW_COUNT: true, // 浏览计数
  
  // 动效配置
  MODERN_WEIBO_ANIMATION_ENABLE: true, // 启用动画
  MODERN_WEIBO_HOVER_EFFECTS: true, // 悬停效果
  MODERN_WEIBO_SMOOTH_SCROLL: true, // 平滑滚动
  MODERN_WEIBO_PARTICLE_EFFECTS: true, // 粒子特效
  MODERN_WEIBO_NEON_EFFECTS: true, // 霓虹效果
  
  // Social Gaming App 配色方案 (参考 Dribbble 设计)
  MODERN_WEIBO_PRIMARY_COLOR: '#DE55CF', // 亮粉色（主色调）
  MODERN_WEIBO_SECONDARY_COLOR: '#3D4256', // 深蓝灰色（辅助色）
  MODERN_WEIBO_ACCENT_COLOR: '#F20921', // 亮红色（强调色）
  MODERN_WEIBO_SUCCESS_COLOR: '#8BAB8A', // 绿色（成功色）
  MODERN_WEIBO_WARNING_COLOR: '#BB3529', // 红色（警告色）
  MODERN_WEIBO_INFO_COLOR: '#3A5BAD', // 蓝色（信息色）
  MODERN_WEIBO_DARK_COLOR: '#5A1710', // 深红棕色（深色）
  
  // 背景配色 (基于 #050305 深黑色)
  MODERN_WEIBO_BG_PRIMARY: '#050305', // 主背景（极深黑）
  MODERN_WEIBO_BG_SECONDARY: '#0F0F0F', // 次背景（深黑）
  MODERN_WEIBO_BG_CARD: '#1A1A1A', // 卡片背景
  MODERN_WEIBO_BG_HOVER: '#252525', // 悬停背景
  
  // 文字颜色
  MODERN_WEIBO_TEXT_PRIMARY: '#FFFFFF', // 主文字（纯白）
  MODERN_WEIBO_TEXT_SECONDARY: '#E0E0E0', // 次文字（浅白）
  MODERN_WEIBO_TEXT_MUTED: '#A0A0A0', // 静音文字（灰白）
  
  // 边框颜色
  MODERN_WEIBO_BORDER_PRIMARY: '#2A2A2A', // 主边框
  MODERN_WEIBO_BORDER_GLOW: '#DE55CF', // 发光边框（粉色）
  
  // 社交色彩主题
  MODERN_WEIBO_SOCIAL_LIKE: '#F20921', // 点赞红色
  MODERN_WEIBO_SOCIAL_COMMENT: '#3A5BAD', // 评论蓝色
  MODERN_WEIBO_SOCIAL_SHARE: '#8BAB8A', // 分享绿色
  MODERN_WEIBO_SOCIAL_BOOKMARK: '#DE55CF', // 收藏粉色
  
  // 布局配置
  MODERN_WEIBO_LAYOUT_TYPE: 'social', // social, card, list, grid
  MODERN_WEIBO_CONTAINER_WIDTH: '1200', // 容器最大宽度
  MODERN_WEIBO_CONTENT_WIDTH: '800', // 内容区宽度
  
  // 社交游戏风格特效配置
  MODERN_WEIBO_SHOW_AUTHOR_CARD: true, // 是否显示作者卡片
  MODERN_WEIBO_SHOW_STATISTICS: true, // 是否显示统计信息
  MODERN_WEIBO_ENABLE_DARK_MODE: false, // 关闭暗色模式切换（默认就是暗色）
  MODERN_WEIBO_SHOW_MATRIX_BG: false, // 关闭矩阵背景（使用纯色）
  MODERN_WEIBO_SHOW_GRID_PATTERN: true, // 保留网格图案
  MODERN_WEIBO_SHOW_GAMING_ELEMENTS: true, // 显示游戏化元素
  MODERN_WEIBO_SHOW_SOCIAL_REACTIONS: true, // 显示社交反应
}

export default CONFIG 