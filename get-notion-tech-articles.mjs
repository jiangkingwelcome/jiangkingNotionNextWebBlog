// 测试获取Notion数据，特别是技术空间的文章
import { NotionAPI } from 'notion-client';
import fs from 'fs';
import BLOG from './blog.config.js';

async function main() {
  try {
    console.log('Notion页面ID:', BLOG.NOTION_PAGE_ID);
    
    const authToken = BLOG.NOTION_ACCESS_TOKEN || null;
    const api = new NotionAPI({
      authToken,
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    
    // 解析可能包含多个ID的配置
    const pageIds = BLOG.NOTION_PAGE_ID.split(',').map(id => id.trim());
    const pageId = pageIds[0].includes(':') ? pageIds[0].split(':')[1] : pageIds[0];
    
    console.log('尝试获取页面:', pageId);
    const pageData = await api.getPage(pageId);
    
    // 将数据写入文件便于查看
    fs.writeFileSync('notion-data.json', JSON.stringify(pageData, null, 2));
    
    console.log('成功获取Notion数据');
    console.log('数据已写入 notion-data.json 文件');
    
    // 输出一些基本信息
    const recordMap = pageData || {};
    const blocks = recordMap.block || {};
    const blockIds = Object.keys(blocks);
    
    console.log('获取到的块数量:', blockIds.length);
    
    // 查找技术空间相关的块
    let techArticles = [];
    let categoryBlocks = [];
    
    for (const blockId of blockIds) {
      const block = blocks[blockId];
      if (!block || !block.value) {
        console.log('跳过无效的块:', blockId);
        continue;
      }
      
      const blockValue = block.value;
      
      // 查看块的类型
      console.log(`块 ${blockId} 类型: ${blockValue.type}`);
      
      // 查找包含"技术空间"或者技术相关分类的块
      if (blockValue.properties && blockValue.properties.title) {
        const title = blockValue.properties.title;
        if (Array.isArray(title) && title.length > 0) {
          const titleText = title.map(t => Array.isArray(t) ? t[0] : '').join('');
          console.log(`块标题: ${titleText}`);
          
          if (titleText.includes('技术') || titleText.includes('编程') || titleText.includes('开发')) {
            categoryBlocks.push(blockValue);
            console.log('找到技术相关分类:', titleText);
          }
        }
      }
      
      // 查找文章类型的块
      if (blockValue.type === 'page' && blockValue.properties && blockValue.properties.title) {
        const title = blockValue.properties.title;
        if (Array.isArray(title) && title.length > 0) {
          const titleText = title.map(t => Array.isArray(t) ? t[0] : '').join('');
          const article = {
            id: blockValue.id,
            title: titleText,
            type: blockValue.type,
            created: new Date(blockValue.created_time).toLocaleString(),
            lastEdited: new Date(blockValue.last_edited_time).toLocaleString()
          };
          techArticles.push(article);
          console.log('找到文章:', titleText);
        }
      }
    }
    
    console.log('找到的技术相关分类数量:', categoryBlocks.length);
    console.log('找到的文章总数:', techArticles.length);
    
    // 将文章信息写入文件
    fs.writeFileSync('tech-articles.json', JSON.stringify(techArticles, null, 2));
    console.log('文章信息已写入 tech-articles.json 文件');
    
    // 输出技术文章列表
    console.log('\n技术文章列表:');
    techArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} (上次编辑: ${article.lastEdited})`);
    });
    
  } catch (error) {
    console.error('获取Notion数据时出错:', error);
  }
}

main(); 