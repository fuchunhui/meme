// 读取 meme-old.db 的数据，读取 GIF 表数据
// 读取 title 和 image 字段
// image字段是base64编码的图片，使用 title 命名，存储到 assets 目录下
// 如果 image 字段为空，则跳过

import fs from 'fs';
import initSqlJs from 'sql.js';
import path from 'path';

// 初始化 SQL.js
const SQL = await initSqlJs({
  locateFile: file => `./node_modules/sql.js/dist/${file}`
});

// 数据库文件路径
const DB_PATH = './public/db/meme-old.db';
const ASSETS_DIR = './assets';

// 确保 assets 目录存在
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

/**
 * 从 base64 字符串中提取图片格式
 * @param {string} base64String 
 * @returns {string} 文件扩展名
 */
function getImageExtension(base64String) {
  if (base64String.startsWith('data:image/jpeg') || base64String.startsWith('data:image/jpg')) {
    return '.jpg';
  } else if (base64String.startsWith('data:image/png')) {
    return '.png';
  } else if (base64String.startsWith('data:image/gif')) {
    return '.gif';
  } else if (base64String.startsWith('data:image/webp')) {
    return '.webp';
  }
  return '.png'; // 默认扩展名
}

/**
 * 清理文件名，移除不合法的字符
 * @param {string} filename 
 * @returns {string} 清理后的文件名
 */
function sanitizeFilename(filename) {
  return filename.replace(/[<>:"/\\|?*]/g, '_').trim();
}

/**
 * 保存 base64 图片到文件
 * @param {string} base64Data 
 * @param {string} filename 
 */
function saveBase64Image(base64Data, filename) {
  try {
    // 移除 data:image/xxx;base64, 前缀
    const base64Content = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // 获取图片扩展名
    const extension = getImageExtension(base64Data);
    
    // 清理文件名
    const cleanFilename = sanitizeFilename(filename);
    
    // 构建完整的文件路径
    const filePath = path.join(ASSETS_DIR, `${cleanFilename}${extension}`);
    
    // 将 base64 转换为 Buffer 并写入文件
    const buffer = Buffer.from(base64Content, 'base64');
    fs.writeFileSync(filePath, buffer);
    
    console.log(`图片已保存: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error(`保存图片失败 ${filename}:`, error.message);
    return null;
  }
}

/**
 * 主函数：读取数据库并处理图片
 */
async function processDatabase() {
  try {
    // 检查数据库文件是否存在
    if (!fs.existsSync(DB_PATH)) {
      console.error(`数据库文件不存在: ${DB_PATH}`);
      return;
    }

    // 读取数据库文件
    const dbBuffer = fs.readFileSync(DB_PATH);
    const db = new SQL.Database(new Uint8Array(dbBuffer));

    // 查询 GIF 表的数据（GIF 表有 title 和 image 字段）
    const query = 'SELECT title, image FROM GIF WHERE image IS NOT NULL AND image != ""';
    const stmt = db.prepare(query);
    
    let processedCount = 0;
    let skippedCount = 0;

    // 执行查询并处理结果
    while (stmt.step()) {
      const row = stmt.getAsObject();
      const { title, image } = row;

      if (!image || image.trim() === '') {
        console.log(`跳过空图片记录: ${title}`);
        skippedCount++;
        continue;
      }

      // 保存图片
      const savedPath = saveBase64Image(image, title);
      if (savedPath) {
        processedCount++;
      } else {
        skippedCount++;
      }
    }

    // 释放资源
    stmt.free();
    db.close();

    console.log(`\n处理完成:`);
    console.log(`- 成功处理: ${processedCount} 张图片`);
    console.log(`- 跳过: ${skippedCount} 条记录`);

  } catch (error) {
    console.error('处理数据库时发生错误:', error.message);
  }
}

// 运行主函数
processDatabase().catch(console.error);

