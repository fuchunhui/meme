/**
 * 测试脚本 - 测试 catalog 接口
 * 数据库已经有数据，请直接调用 catalog 接口进行内容获取测试
 */

import { getCatalog } from '../src/service/data.js';
import { STORY_TYPE } from '../src/db/index.js';

/**
 * 测试 getCatalog 接口
 * @param {string} dbPath 数据库路径
 */
function testGetCatalog(dbPath = 'meme') {
  console.log('🧪 开始测试 getCatalog 接口');
  console.log('='.repeat(60));
  
  try {
    // 构建上下文对象
    const ctx = { path: dbPath };
    
    console.log(`📋 测试数据库: ${dbPath}`);
    console.log(`🔍 调用 getCatalog 接口...`);
    
    // 调用 getCatalog 接口
    const result = getCatalog(ctx);
    
    console.log('📤 接口返回结果:');
    console.log(JSON.stringify(result, null, 2));
    
    // 验证返回结果
    if (Array.isArray(result)) {
      console.log(`✅ 返回数据类型正确 (Array)`);
      console.log(`📊 总记录数: ${result.length}`);
      
      if (result.length > 0) {
        console.log('\n📝 数据结构分析:');
        
        // 分析第一条记录的结构
        const firstRecord = result[0];
        console.log('🔸 第一条记录结构:', Object.keys(firstRecord));
        
        // 验证必需字段
        const requiredFields = ['mid', 'name', 'type'];
        const missingFields = requiredFields.filter(field => !(field in firstRecord));
        
        if (missingFields.length === 0) {
          console.log('✅ 记录包含所有必需字段 (mid, name, type)');
        } else {
          console.log('❌ 缺少必需字段:', missingFields);
        }
        
        // 统计各类型数量
        const typeStats = {};
        result.forEach(record => {
          const type = record.type;
          typeStats[type] = (typeStats[type] || 0) + 1;
        });
        
        console.log('\n📈 类型统计:');
        Object.entries(typeStats).forEach(([type, count]) => {
          console.log(`  🔸 ${type}: ${count} 个`);
        });
        
        // 显示前几条记录的详细信息
        const displayCount = Math.min(5, result.length);
        console.log(`\n📄 前 ${displayCount} 条记录详情:`);
        result.slice(0, displayCount).forEach((record, index) => {
          console.log(`  ${index + 1}. mid: ${record.mid}, name: "${record.name}", type: ${record.type}`);
        });
        
        // 验证数据完整性
        console.log('\n🔍 数据完整性检查:');
        const invalidRecords = result.filter(record => 
          !record.mid || !record.name || !record.type
        );
        
        if (invalidRecords.length === 0) {
          console.log('✅ 所有记录数据完整');
        } else {
          console.log(`❌ 发现 ${invalidRecords.length} 条不完整记录:`, invalidRecords);
        }
        
        // 验证类型有效性
        const validTypes = Object.values(STORY_TYPE);
        const invalidTypeRecords = result.filter(record => 
          !validTypes.includes(record.type)
        );
        
        if (invalidTypeRecords.length === 0) {
          console.log('✅ 所有记录类型有效');
        } else {
          console.log(`❌ 发现 ${invalidTypeRecords.length} 条无效类型记录:`, invalidTypeRecords);
        }
        
      } else {
        console.log('⚠️  数据库中暂无数据');
      }
      
    } else {
      console.log('❌ 返回数据类型错误，期望 Array，实际:', typeof result);
    }
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error('🔍 错误堆栈:', error.stack);
  }
  
  console.log('='.repeat(60));
  console.log('✨ getCatalog 接口测试完成\n');
}

/**
 * 性能测试
 */
function performanceTest() {
  console.log('⚡ 开始性能测试');
  console.log('='.repeat(60));
  
  const ctx = { path: 'meme' };
  const iterations = 100;
  
  console.log(`🔄 执行 ${iterations} 次调用进行性能测试...`);
  
  const startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    getCatalog(ctx);
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
  
  console.log('='.repeat(60));
  console.log('✨ 性能测试完成\n');
}

/**
 * 边界情况测试
 */
function boundaryTest() {
  console.log('🔬 开始边界情况测试');
  console.log('='.repeat(60));
  
  // 测试空上下文
  console.log('📝 测试 1: 空上下文');
  try {
    const result = getCatalog({});
    console.log('✅ 空上下文测试通过，返回:', result);
  } catch (error) {
    console.log('❌ 空上下文测试失败:', error.message);
  }
  
  // 测试无效路径
  console.log('\n📝 测试 2: 无效数据库路径');
  try {
    const result = getCatalog({ path: 'nonexistent_db' });
    console.log('✅ 无效路径测试通过，返回:', result);
  } catch (error) {
    console.log('❌ 无效路径测试失败:', error.message);
  }
  
  // 测试 null 上下文
  console.log('\n📝 测试 3: null 上下文');
  try {
    const result = getCatalog(null);
    console.log('✅ null 上下文测试通过，返回:', result);
  } catch (error) {
    console.log('❌ null 上下文测试失败:', error.message);
  }
  
  console.log('='.repeat(60));
  console.log('✨ 边界情况测试完成\n');
}

// 执行所有测试
(async () => {
  console.log('🚀 开始执行 getCatalog 接口测试套件');
  console.log('='.repeat(80));
  
  try {
    // 基本功能测试
    await testGetCatalog('meme');
    
    // 性能测试
    await performanceTest();
    
    // 边界情况测试
    await boundaryTest();
    
    console.log('🎉 所有 getCatalog 接口测试完成！');
  } catch (error) {
    console.error('❌ 测试套件执行失败:', error.message);
  }
})();