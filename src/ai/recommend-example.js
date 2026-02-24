/**
 * recommendMemeCommand 调用示例
 * 用法：
 *   pnpm ai:recommend "我想表达：你太强了"
 *   node --env-file=.env src/ai/recommend-example.js "哈哈哈笑死我了"
 */
import { recommendMemeCommand } from './recommend.js';

const queries = [
  process.argv.slice(2).join(' ').trim() || null,
  '你太强了，我真心佩服',
  '哈哈哈笑死我了',
  '我现在很难过，想哭',
].filter(Boolean).slice(0, 3);

const ctx = { path: 'meme' };

for (const query of queries) {
  console.log('\n' + '='.repeat(50));
  console.log('输入:', query);

  const result = await recommendMemeCommand(query, ctx);

  if (result.success) {
    const r = result.recommendation;
    console.log('推荐指令:', r.command);
    console.log('匹配度:  ', r.confidence);
    console.log('参数:    ', r.parameters);
    console.log('替代指令:', r.alternatives);
    console.log('意图:    ', r.intent);
    console.log('说明:    ', r.reason);
  } else {
    console.error('失败:', result.error);
  }
}
