/**
 * 测试脚本 - 测试 src/service/data.js open 接口
 * const ctx = { path: 'meme' };
 * 数据库已经有数据，请直接调用 open 接口进行内容获取测试
 */

import { open, getCatalog } from '../src/service/data.js';
import { STORY_TYPE } from '../src/db/index.js';

/**
 * 测试 open 接口 - 使用指定的 mid
 * @param {string} mid 表情包 ID
 * @param {string} dbPath 数据库路径
 */
function testOpenWithMid(mid, dbPath = 'meme') {
  console.log(`🧪 开始测试 open 接口 - mid: ${mid}`);
  console.log('='.repeat(60));
  
  try {
    // 构建上下文对象
    const ctx = { path: dbPath };
    
    console.log(`📋 测试参数:`);
    console.log(`  🔸 mid: ${mid}`);
    console.log(`  🔸 数据库: ${dbPath}`);
    
    console.log(`🔍 调用 open 接口...`);
    
    // 调用 open 接口
    const result = open(mid, ctx);
    
    console.log('📤 接口返回结果:');
    console.log(JSON.stringify(result, null, 2));
    
    // 验证返回结果结构
    if (result && typeof result === 'object') {
      console.log(`✅ 返回数据类型正确 (Object)`);
      
      // 验证必需字段
      const requiredFields = ['mid', 'name', 'type', 'image', 'children', 'more'];
      const existingFields = Object.keys(result);
      console.log('🔸 返回字段:', existingFields);
      
      const missingFields = requiredFields.filter(field => !(field in result));
      
      if (missingFields.length === 0) {
        console.log('✅ 包含所有必需字段 (mid, name, type, image, children, more)');
      } else {
        console.log('❌ 缺少必需字段:', missingFields);
      }
      
      // 验证字段类型和内容
      if (result.mid) {
        console.log(`✅ mid 字段有效: ${result.mid}`);
      } else {
        console.log('❌ mid 字段为空或无效');
      }
      
      if (result.name) {
        console.log(`✅ name 字段有效: "${result.name}"`);
      } else {
        console.log('❌ name 字段为空或无效');
      }
      
      if (result.type && Object.values(STORY_TYPE).includes(result.type)) {
        console.log(`✅ type 字段有效: ${result.type}`);
      } else {
        console.log(`❌ type 字段无效: ${result.type}`);
      }
      
      if (typeof result.image === 'string') {
        if (result.image.startsWith('data:image/')) {
          console.log('✅ image 字段为有效的 base64 数据');
        } else if (result.image === '') {
          console.log('⚠️  image 字段为空字符串');
        } else {
          console.log('⚠️  image 字段格式可能不正确');
        }
      } else {
        console.log('❌ image 字段类型不正确，应为字符串');
      }
      
      if (Array.isArray(result.children)) {
        console.log(`✅ children 字段为数组，包含 ${result.children.length} 个子项`);
        
        if (result.children.length > 0) {
          console.log('📄 children 详情:');
          result.children.forEach((child, index) => {
            console.log(`  ${index + 1}. ${JSON.stringify(child)}`);
          });
        }
      } else {
        console.log('❌ children 字段应为数组');
      }
      
      // 验证 more 字段
      console.log('🔍 检查 more 字段...');
      if (result.hasOwnProperty('more')) {
        console.log(`✅ more 字段存在`);
        
        if (result.type === STORY_TYPE.IMAGE) {
          console.log('📸 检查 IMAGE 类型的 more 字段...');
          if (typeof result.more === 'object' && result.more !== null) {
            const imageFields = ['x', 'y', 'width', 'height', 'ipath'];
            const moreKeys = Object.keys(result.more);
            const missingImageFields = imageFields.filter(field => !(field in result.more));
            
            if (missingImageFields.length === 0) {
              console.log('✅ IMAGE 类型 more 字段包含所有必需字段 (x, y, width, height, ipath)');
              console.log(`  🔸 x: ${result.more.x}`);
              console.log(`  🔸 y: ${result.more.y}`);
              console.log(`  🔸 width: ${result.more.width}`);
              console.log(`  🔸 height: ${result.more.height}`);
              console.log(`  🔸 ipath: ${result.more.ipath}`);
            } else {
              console.log('❌ IMAGE 类型 more 字段缺少必需字段:', missingImageFields);
            }
          } else {
            console.log('❌ IMAGE 类型 more 字段应为对象');
          }
        } else if (result.type === STORY_TYPE.ADDITIONAL) {
          console.log('📝 检查 ADDITIONAL 类型的 more 字段...');
          if (typeof result.more === 'object' && result.more !== null) {
            if (result.more.hasOwnProperty('text')) {
              console.log('✅ ADDITIONAL 类型 more 字段包含 text 字段');
              console.log(`  🔸 text: "${result.more.text}"`);
            } else {
              console.log('❌ ADDITIONAL 类型 more 字段缺少 text 字段');
            }
          } else {
            console.log('❌ ADDITIONAL 类型 more 字段应为对象');
          }
        } else {
          console.log(`📋 其他类型 (${result.type}) more 字段:`);
          if (result.more === '') {
            console.log('✅ more 字段为空字符串（符合预期）');
          } else {
            console.log(`⚠️  more 字段值: ${JSON.stringify(result.more)} (期望为空字符串)`);
          }
        }
      } else {
        console.log('❌ more 字段不存在');
      }
      
    } else {
      console.log('❌ 返回数据类型错误，期望 Object，实际:', typeof result);
    }
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error('🔍 错误堆栈:', error.stack);
  }
  
  console.log('='.repeat(60));
  console.log(`✨ open 接口测试完成 - mid: ${mid}\n`);
}

/**
 * 自动获取可用的 mid 进行测试
 * @param {string} dbPath 数据库路径
 */
function testOpenWithAvailableMids(dbPath = 'meme') {
  console.log('🔍 自动获取可用 mid 进行测试');
  console.log('='.repeat(60));
  
  try {
    const ctx = { path: dbPath };
    
    // 先获取目录列表
    const catalog = getCatalog(ctx);
    
    if (!Array.isArray(catalog) || catalog.length === 0) {
      console.log('⚠️  数据库中没有可用数据，跳过自动测试');
      return;
    }
    
    console.log(`📊 数据库中找到 ${catalog.length} 条记录`);
    
    // 选择前几条记录进行测试
    const testCount = Math.min(3, catalog.length);
    console.log(`🧪 将测试前 ${testCount} 条记录\n`);
    
    catalog.slice(0, testCount).forEach((item, index) => {
      console.log(`\n🚀 测试第 ${index + 1} 条记录:`);
      testOpenWithMid(item.mid, dbPath);
    });
    
  } catch (error) {
    console.error('❌ 自动测试过程中发生错误:', error.message);
  }
}

/**
 * 边界情况测试
 */
function boundaryTest() {
  console.log('🔬 开始边界情况测试');
  console.log('='.repeat(60));
  
  const ctx = { path: 'meme' };
  
  // 测试不存在的 mid
  console.log('📝 测试 1: 不存在的 mid');
  try {
    const result = open('nonexistent_mid', ctx);
    console.log('⚠️  不存在的 mid 测试结果:', result);
  } catch (error) {
    console.log('❌ 不存在的 mid 测试失败:', error.message);
  }
  
  // 测试空 mid
  console.log('\n📝 测试 2: 空 mid');
  try {
    const result = open('', ctx);
    console.log('⚠️  空 mid 测试结果:', result);
  } catch (error) {
    console.log('❌ 空 mid 测试失败:', error.message);
  }
  
  // 测试 null mid
  console.log('\n📝 测试 3: null mid');
  try {
    const result = open(null, ctx);
    console.log('⚠️  null mid 测试结果:', result);
  } catch (error) {
    console.log('❌ null mid 测试失败:', error.message);
  }
  
  // 测试无效上下文
  console.log('\n📝 测试 4: 无效上下文');
  try {
    const result = open('some_mid', { path: 'nonexistent_db' });
    console.log('⚠️  无效上下文测试结果:', result);
  } catch (error) {
    console.log('❌ 无效上下文测试失败:', error.message);
  }
  
  console.log('='.repeat(60));
  console.log('✨ 边界情况测试完成\n');
}

/**
 * 性能测试
 */
function performanceTest() {
  console.log('⚡ 开始性能测试');
  console.log('='.repeat(60));
  
  try {
    const ctx = { path: 'meme' };
    
    // 获取一个有效的 mid
    const catalog = getCatalog(ctx);
    if (!catalog || catalog.length === 0) {
      console.log('⚠️  没有可用数据，跳过性能测试');
      return;
    }
    
    const testMid = catalog[0].mid;
    const iterations = 100;
    
    console.log(`🔄 使用 mid: ${testMid}`);
    console.log(`🔄 执行 ${iterations} 次调用进行性能测试...`);
    
    const startTime = Date.now();
    
    for (let i = 0; i < iterations; i++) {
      open(testMid, ctx);
    }
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const avgTime = totalTime / iterations;
    
    console.log(`📊 性能测试结果:`);
    console.log(`  🔸 总耗时: ${totalTime}ms`);
    console.log(`  🔸 平均耗时: ${avgTime.toFixed(2)}ms`);
    console.log(`  🔸 QPS: ${(1000 / avgTime).toFixed(2)} 次/秒`);
    
    if (avgTime < 10) {
      console.log('✅ 性能良好');
    } else if (avgTime < 50) {
      console.log('⚠️  性能一般');
    } else {
      console.log('❌ 性能较差，需要优化');
    }
    
  } catch (error) {
    console.error('❌ 性能测试失败:', error.message);
  }
  
  console.log('='.repeat(60));
  console.log('✨ 性能测试完成\n');
}

// 执行所有测试
(async () => {
  console.log('🚀 开始执行 open 接口测试套件');
  console.log('='.repeat(80));
  
  try {
    // 自动测试可用的记录
    await testOpenWithAvailableMids('meme');
    
    // 边界情况测试
    await boundaryTest();
    
    // 性能测试
    await performanceTest();
    
    console.log('🎉 所有 open 接口测试完成！');
  } catch (error) {
    console.error('❌ 测试套件执行失败:', error.message);
  }
})();