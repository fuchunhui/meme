/**
 * 测试脚本 - 测试 create 接口
 * 读取 assets 目录下的张飞.png 文件，转换为 base64 格式，调用 create 接口
 */

import fs from 'fs';
import path from 'path';
import { create } from '../src/service/data.js';

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
 * 测试 create 接口
 * @param {string} imageName 图片名称（不包含扩展名）
 * @param {string} type 表情类型
 */
async function testCreateInterface(imageName, type = 'TEXT') {
  console.log(`🧪 开始测试 create 接口: ${imageName}`);
  
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
      name: imageName,
      image: base64Image,
      type: type.toUpperCase()
    };
    
    console.log('📋 请求参数:', {
      name: options.name,
      type: options.type,
      image: `${options.image.substring(0, 50)}...`
    });
    
    // 调用 create 接口
    const result = create(options, { path: 'meme' });
    
    console.log('📤 接口返回:', result);
    
    if (result && result.errNo === 0) {
      console.log('✅ create 接口调用成功');
      console.log('生成的 mid:', result.data?.mid);
    } else {
      console.error('❌ create 接口调用失败:', result?.message || '未知错误');
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    return null;
  }
}

// 执行 create 接口测试
testCreateInterface('张飞', 'TEXT').catch(console.error);
testCreateInterface('清醒一下', 'GIF').catch(console.error);
testCreateInterface('大佬', 'ADDITIONAL').catch(console.error);
testCreateInterface('王有胜', 'REPEAT').catch(console.error);
testCreateInterface('上号', 'IMAGE').catch(console.error);