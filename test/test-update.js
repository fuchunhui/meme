/**
 * 测试脚本 - 测试 update 接口
 * 先调用 create 接口创建测试数据，然后调用 update 接口进行更新测试
 */

import fs from 'fs';
import path from 'path';
import { create, update } from '../src/service/data.js';
import { STORY_TYPE } from '../src/db/index.js';

/**
 * 读取图片文件并转换为 base64 格式
 * @param {string} imagePath 图片文件路径
 * @returns {string|null} base64 格式的图片数据
 */
function convertImageToBase64(imagePath) {
  try {
    // 读取图片文件
    const imageBuffer = fs.readFileSync(imagePath);
    
    // 获取文件扩展名
    const ext = path.extname(imagePath).toLowerCase();
    
    // 确定 MIME 类型
    let mimeType;
    switch (ext) {
      case '.png':
        mimeType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        mimeType = 'image/jpeg';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
      case '.webp':
        mimeType = 'image/webp';
        break;
      default:
        mimeType = 'image/png'; // 默认
    }
    
    // 转换为 base64
    const base64Data = imageBuffer.toString('base64');
    
    // 返回完整的 data URL
    return `data:${mimeType};base64,${base64Data}`;
  } catch (error) {
    console.error('❌ 读取图片文件失败:', error.message);
    return null;
  }
}

/**
 * 创建测试数据
 * @param {string} imageName 图片名称
 * @param {string} type 表情类型
 * @returns {Promise<object|null>} 创建结果
 */
async function createTestData(imageName, type = 'TEXT') {
  console.log(`🔧 创建测试数据: ${imageName}`);
  
  try {
    // 构建图片路径
    const imagePath = `./assets/${imageName}.${type === 'GIF' ? 'gif' : 'png'}`;
    
    // 检查文件是否存在
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ 文件不存在: ${imagePath}`);
      return null;
    }
    
    // 转换为 base64
    const base64Image = convertImageToBase64(imagePath);
    if (!base64Image) {
      console.error('❌ 转换 base64 失败');
      return null;
    }
    
    // 构建选项对象
    const options = {
      name: `test_${imageName}_${Date.now()}`, // 添加时间戳避免重复
      image: base64Image,
      type: type.toUpperCase()
    };
    
    // 调用 create 接口
    const result = create(options, { path: 'meme' });
    
    if (result && result.errNo === 0) {
      console.log('✅ 测试数据创建成功, mid:', result.data?.mid);
      return result.data;
    } else {
      console.error('❌ 测试数据创建失败:', result?.message || '未知错误');
      return null;
    }
    
  } catch (error) {
    console.error('❌ 创建测试数据时发生错误:', error.message);
    return null;
  }
}

/**
 * 测试 update 接口 - TEXT 类型
 * @param {string} mid 表情包 ID
 */
async function testUpdateText(mid) {
  console.log(`🧪 开始测试 update 接口 (TEXT 类型): ${mid}`);
  
  try {
    const params = {
      mid: mid,
      type: STORY_TYPE.TEXT,
      options: {
        x: 50,
        y: 60,
        max: 120,
        font: 'Arial',
        color: '#FF0000',
        align: 'center',
        direction: 'up',
        blur: 2,
        degree: 15,
        stroke: '#FFFFFF',
        swidth: 2
      }
    };
    
    console.log('📋 更新参数:', params);
    
    // 调用 update 接口
    const result = update(params, { path: 'meme' });
    
    console.log('📤 接口返回:', result);
    
    if (result && result.errNo === 0) {
      console.log('✅ TEXT 类型 update 接口调用成功');
    } else {
      console.error('❌ TEXT 类型 update 接口调用失败:', result?.message || '未知错误');
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ 测试 TEXT update 过程中发生错误:', error.message);
    return null;
  }
}

/**
 * 测试 update 接口 - IMAGE 类型
 * @param {string} mid 表情包 ID
 */
async function testUpdateImage(mid) {
  console.log(`🧪 开始测试 update 接口 (IMAGE 类型): ${mid}`);
  
  try {
    const params = {
      mid: mid,
      type: STORY_TYPE.IMAGE,
      options: {
        x: 30,
        y: 40,
        max: 150,
        font: 'Helvetica',
        color: '#00FF00',
        align: 'end',
        direction: 'left',
        blur: 1,
        degree: 45,
        stroke: '#000000',
        swidth: 3
      },
      more: {
        x: 10,
        y: 20,
        width: 200,
        height: 150,
        ipath: 'SVG'
      }
    };
    
    console.log('📋 更新参数:', params);
    
    // 调用 update 接口
    const result = update(params, { path: 'meme' });
    
    console.log('📤 接口返回:', result);
    
    if (result && result.errNo === 0) {
      console.log('✅ IMAGE 类型 update 接口调用成功');
    } else {
      console.error('❌ IMAGE 类型 update 接口调用失败:', result?.message || '未知错误');
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ 测试 IMAGE update 过程中发生错误:', error.message);
    return null;
  }
}

/**
 * 测试 update 接口 - ADDITIONAL 类型
 * @param {string} mid 表情包 ID
 */
async function testUpdateAdditional(mid) {
  console.log(`🧪 开始测试 update 接口 (ADDITIONAL 类型): ${mid}`);
  
  try {
    const params = {
      mid: mid,
      type: STORY_TYPE.ADDITIONAL,
      options: {
        x: 20,
        y: 30,
        max: 80,
        font: 'Times New Roman',
        color: '#0000FF',
        align: 'start',
        direction: 'right',
        blur: 0,
        degree: 0,
        stroke: 'transparent',
        swidth: 1
      },
      more: {
        text: '这是更新后的附加文本内容'
      }
    };
    
    console.log('📋 更新参数:', params);
    
    // 调用 update 接口
    const result = update(params, { path: 'meme' });
    
    console.log('📤 接口返回:', result);
    
    if (result && result.errNo === 0) {
      console.log('✅ ADDITIONAL 类型 update 接口调用成功');
    } else {
      console.error('❌ ADDITIONAL 类型 update 接口调用失败:', result?.message || '未知错误');
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ 测试 ADDITIONAL update 过程中发生错误:', error.message);
    return null;
  }
}

/**
 * 完整的更新测试流程
 * @param {string} imageName 图片名称
 * @param {string} type 表情类型
 */
async function testCompleteUpdateFlow(imageName, type) {
  console.log(`\n🚀 开始完整的 update 测试流程: ${imageName} (${type})`);
  console.log('='.repeat(60));
  
  // 第一步：创建测试数据
  const createResult = await createTestData(imageName, type);
  if (!createResult || !createResult.mid) {
    console.error('❌ 无法创建测试数据，跳过 update 测试');
    return;
  }
  
  const mid = createResult.mid;
  
  // 第二步：根据类型测试相应的 update 接口
  switch (type.toUpperCase()) {
    case STORY_TYPE.TEXT:
    case STORY_TYPE.REPEAT:
    case STORY_TYPE.GIF:
      await testUpdateText(mid);
      break;
    case STORY_TYPE.IMAGE:
      await testUpdateImage(mid);
      break;
    case STORY_TYPE.ADDITIONAL:
      await testUpdateAdditional(mid);
      break;
    default:
      console.error('❌ 不支持的类型:', type);
  }
  
  console.log('='.repeat(60));
  console.log(`✨ ${imageName} (${type}) 测试流程完成\n`);
}

// 执行所有类型的 update 接口测试
(async () => {
  console.log('🧪 开始执行 update 接口测试套件');
  console.log('='.repeat(80));
  
  try {
    await testCompleteUpdateFlow('张飞', 'TEXT');
    await testCompleteUpdateFlow('清醒一下', 'GIF');
    await testCompleteUpdateFlow('大佬', 'ADDITIONAL');
    await testCompleteUpdateFlow('王有胜', 'REPEAT');
    await testCompleteUpdateFlow('上号', 'IMAGE');
    
    console.log('🎉 所有 update 接口测试完成！');
  } catch (error) {
    console.error('❌ 测试套件执行失败:', error.message);
  }
})();
