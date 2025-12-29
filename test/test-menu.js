/**
 * 测试脚本 - 测试 src/service/data.js normalMenu 和 gifMenu 接口
 * const ctx = { path: 'meme' };
 * 数据库已经有数据，不需要再创建，请直接调用接口进行测试
 */

import { normalMenu, gifMenu, getCatalog } from '../src/service/data.js';
import { getTable } from '../src/db/index.js';
import { STORY_TABLE, TEXT_TABLE } from '../src/db/constant.js';

// 测试上下文
const ctx = { path: 'meme' };

console.log('🚀 开始测试菜单相关接口...\n');

// 辅助函数：格式化输出
const formatOutput = (title, data) => {
  console.log(`📋 ${title}:`);
  console.log('─'.repeat(50));
  console.log(JSON.stringify(data, null, 2));
  console.log('\n');
};

// 辅助函数：统计信息
const getStatistics = (data) => {
  if (Array.isArray(data)) {
    return { count: data.length, type: 'Array' };
  } else if (data && typeof data === 'object') {
    const keys = Object.keys(data);
    const counts = keys.reduce((acc, key) => {
      acc[key] = Array.isArray(data[key]) ? data[key].length : 'unknown';
      return acc;
    }, {});
    return { keys, counts, type: 'Object' };
  }
  return { type: typeof data };
};

// 辅助函数：创建测试报告
const createTestReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    testResults: {},
    summary: {
      total: 0,
      passed: 0,
      failed: 0
    }
  };
  
  return {
    addTest: (name, passed, details) => {
      report.testResults[name] = { passed, details };
      report.summary.total++;
      if (passed) {
        report.summary.passed++;
      } else {
        report.summary.failed++;
      }
    },
    getReport: () => report
  };
};

const testRunner = createTestReport();

try {
  // 1. 测试基础数据
  console.log('1️⃣ 测试基础数据获取');
  console.log('═'.repeat(60));
  
  const allStories = getTable(STORY_TABLE, ctx);
  const allTexts = getTable(TEXT_TABLE, ctx);
  
  console.log(`📊 数据库统计:`);
  console.log(`   - STORY表记录数: ${allStories.length}`);
  console.log(`   - TEXT表记录数: ${allTexts.length}`);
  
  const typeDistribution = allStories.reduce((acc, story) => {
    acc[story.type] = (acc[story.type] || 0) + 1;
    return acc;
  }, {});
  
  console.log(`   - 故事类型分布:`, typeDistribution);
  console.log('\n');

  testRunner.addTest('基础数据获取', allStories.length > 0, {
    storyCount: allStories.length,
    textCount: allTexts.length,
    typeDistribution
  });

  // 2. 测试 normalMenu 接口
  console.log('2️⃣ 测试 normalMenu 接口');
  console.log('═'.repeat(60));
  
  const menuResult = normalMenu(ctx);
  formatOutput('normalMenu 返回结果', menuResult);
  
  const menuStats = getStatistics(menuResult);
  console.log(`📊 normalMenu 统计信息:`, menuStats);
  
  const normalCount = menuResult.normal ? menuResult.normal.length : 0;
  const seniorCount = menuResult.senior ? menuResult.senior.length : 0;
  
  if (menuResult.normal) {
    console.log(`   - 普通表情数量: ${normalCount}`);
    console.log(`   - 普通表情示例:`, menuResult.normal.slice(0, 3).map(item => item.name));
  }
  
  if (menuResult.senior) {
    console.log(`   - 高级表情数量: ${seniorCount}`);
    console.log(`   - 高级表情示例:`, menuResult.senior.slice(0, 3).map(item => item.name));
  }
  console.log('\n');

  const normalMenuValid = menuResult && typeof menuResult === 'object' && 
                         Array.isArray(menuResult.normal) && Array.isArray(menuResult.senior);
  
  testRunner.addTest('normalMenu 接口', normalMenuValid, {
    hasNormalArray: Array.isArray(menuResult.normal),
    hasSeniorArray: Array.isArray(menuResult.senior),
    normalCount,
    seniorCount,
    totalCount: normalCount + seniorCount
  });

  // 3. 测试 gifMenu 接口
  console.log('3️⃣ 测试 gifMenu 接口');
  console.log('═'.repeat(60));
  
  const gifResult = gifMenu(ctx);
  formatOutput('gifMenu 返回结果', gifResult);
  
  const gifStats = getStatistics(gifResult);
  console.log(`📊 gifMenu 统计信息:`, gifStats);
  console.log(`   - GIF表情数量: ${gifResult.length}`);
  if (gifResult.length > 0) {
    console.log(`   - GIF表情列表: ${gifResult.join(', ')}`);
  } else {
    console.log(`   - 暂无GIF表情`);
  }
  console.log('\n');

  const gifMenuValid = Array.isArray(gifResult) && 
                      gifResult.every(item => typeof item === 'string');
  
  testRunner.addTest('gifMenu 接口', gifMenuValid, {
    isArray: Array.isArray(gifResult),
    count: gifResult.length,
    allStrings: gifResult.every(item => typeof item === 'string'),
    items: gifResult
  });

  // 4. 测试 getCatalog 接口（额外测试）
  console.log('4️⃣ 测试 getCatalog 接口');
  console.log('═'.repeat(60));
  
  const catalogResult = getCatalog(ctx);
  formatOutput('getCatalog 返回结果（前5条）', catalogResult.slice(0, 5));
  
  const catalogStats = getStatistics(catalogResult);
  console.log(`📊 getCatalog 统计信息:`, catalogStats);
  console.log(`   - 目录条目数量: ${catalogResult.length}`);
  console.log('\n');

  const catalogValid = Array.isArray(catalogResult) && 
                      catalogResult.every(item => item.mid && item.name && item.type);
  
  testRunner.addTest('getCatalog 接口', catalogValid, {
    isArray: Array.isArray(catalogResult),
    count: catalogResult.length,
    hasRequiredFields: catalogResult.every(item => item.mid && item.name && item.type)
  });

  // 5. 性能测试
  console.log('5️⃣ 性能测试');
  console.log('═'.repeat(60));
  
  const performanceTest = (func, name, iterations = 100) => {
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
      func(ctx);
    }
    const end = Date.now();
    const avgTime = (end - start) / iterations;
    console.log(`⏱️  ${name}: 平均耗时 ${avgTime.toFixed(2)}ms (${iterations}次调用)`);
    return avgTime;
  };
  
  const normalMenuTime = performanceTest(normalMenu, 'normalMenu');
  const gifMenuTime = performanceTest(gifMenu, 'gifMenu');
  const getCatalogTime = performanceTest(getCatalog, 'getCatalog');
  console.log('\n');

  const performanceThreshold = 5; // 5ms阈值
  const performanceValid = normalMenuTime < performanceThreshold && 
                          gifMenuTime < performanceThreshold && 
                          getCatalogTime < performanceThreshold;
  
  testRunner.addTest('性能测试', performanceValid, {
    normalMenuTime: `${normalMenuTime.toFixed(2)}ms`,
    gifMenuTime: `${gifMenuTime.toFixed(2)}ms`,
    getCatalogTime: `${getCatalogTime.toFixed(2)}ms`,
    threshold: `${performanceThreshold}ms`,
    allUnderThreshold: performanceValid
  });

  // 6. 数据一致性检查
  console.log('6️⃣ 数据一致性检查');
  console.log('═'.repeat(60));
  
  const totalFromMenu = normalCount + seniorCount;
  const totalFromCatalog = catalogResult.length;
  const totalFromTable = allStories.length;
  
  console.log(`🔍 数据一致性检查:`);
  console.log(`   - normalMenu总数 (normal + senior): ${totalFromMenu}`);
  console.log(`   - getCatalog总数: ${totalFromCatalog}`);
  console.log(`   - STORY表总数: ${totalFromTable}`);
  
  const dataConsistency = totalFromMenu === totalFromCatalog && totalFromCatalog === totalFromTable;
  console.log(`   - 数据一致性: ${dataConsistency ? '✅ 通过' : '❌ 失败'}`);
  
  // 检查GIF数量一致性
  const gifFromTable = allStories.filter(story => story.type === 'GIF').length;
  const gifFromMenu = gifResult.length;
  const gifConsistency = gifFromTable === gifFromMenu;
  console.log(`   - GIF表情数量一致性: STORY表=${gifFromTable}, gifMenu=${gifFromMenu} ${gifConsistency ? '✅ 通过' : '❌ 失败'}`);
  console.log('\n');

  testRunner.addTest('数据一致性', dataConsistency && gifConsistency, {
    totalConsistency: dataConsistency,
    gifConsistency,
    totalFromMenu,
    totalFromCatalog,
    totalFromTable,
    gifFromTable,
    gifFromMenu
  });

  // 7. 生成测试报告
  console.log('7️⃣ 测试报告');
  console.log('═'.repeat(60));
  
  const report = testRunner.getReport();
  console.log(`📊 测试汇总:`);
  console.log(`   - 总测试数: ${report.summary.total}`);
  console.log(`   - 通过数: ${report.summary.passed}`);
  console.log(`   - 失败数: ${report.summary.failed}`);
  console.log(`   - 成功率: ${((report.summary.passed / report.summary.total) * 100).toFixed(1)}%`);
  
  if (report.summary.failed > 0) {
    console.log('\n❌ 失败的测试:');
    Object.entries(report.testResults).forEach(([name, result]) => {
      if (!result.passed) {
        console.log(`   - ${name}`);
      }
    });
  }
  
  console.log('\n✅ 所有测试完成!');
  
  // 如果需要详细报告，可以输出到文件
  // import fs from 'fs';
  // fs.writeFileSync('./test-report.json', JSON.stringify(report, null, 2));

} catch (error) {
  console.error('❌ 测试过程中发生错误:');
  console.error(error);
  console.error('\n错误堆栈:');
  console.error(error.stack);
  
  testRunner.addTest('测试执行', false, { error: error.message });
}