/**
 * @file 表情包指令推荐
 * @description 抽取 -> 检索 -> 推荐
 */
import { generateText } from 'ai';
import { model } from './config.js';
import { getDB, STORY_TABLE, getElementsByStoryId } from '../db/index.js';

const analyzeInput = async (text) => {
  const prompt = `你是表情包命令抽取器。分析用户输入，提取可用于检索表情包指令的关键词和参数。

用户输入："${text}"

只输出 JSON，格式如下：
{
  "keywords": ["检索关键词1", "检索关键词2"],
  "parameters": ["放在图上的文字参数1", "参数2"],
  "intent": "用户意图简短描述"
}

要求：
- keywords 用于匹配 feature 字段（逗号分隔的标签），提取 3-8 个
- parameters 来自用户输入原文，是会写到表情图上的文字，提取 1-4 个
- intent 不超过 60 字`;

  const { text: raw } = await generateText({
    model,
    messages: [{ role: 'user', content: prompt }],
    maxTokens: 300,
  });

  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return { keywords: [], parameters: [], intent: '' };

  let parsed;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    return { keywords: [], parameters: [], intent: '' };
  }

  return {
    keywords: [].concat(parsed.keywords || []).map(s => String(s).trim()).filter(Boolean),
    parameters: [].concat(parsed.parameters || []).map(s => String(s).trim()).filter(Boolean),
    intent: String(parsed.intent || '').trim(),
  };
}

const searchByFeature = (keywords, ctx, topK = 10) => {
  if (!keywords.length) {
    return [];
  }

  const db = getDB(ctx?.path);
  const matchMap = new Map();

  for (const keyword of keywords) {
    const stmt = db.prepare(`SELECT id, mid, name, feature FROM ${STORY_TABLE} WHERE feature LIKE :kw;`);
    try {
      stmt.bind({ ':kw': `%${keyword}%` });
      while (stmt.step()) {
        const { id, mid, name, feature } = stmt.getAsObject();
        const key = mid ?? id ?? name;
        if (!key) continue;
        const entry = matchMap.get(key) ?? { id, mid, name, feature, hits: new Set() };
        entry.hits.add(keyword);
        matchMap.set(key, entry);
      }
    } finally {
      stmt.free();
    }
  }

  return [...matchMap.values()]
    .map(({ mid, name, hits }) => ({
      name,
      paramCount: mid ? getElementsByStoryId(mid, ctx).length : 0,
      matchedKeywords: [...hits],
      score: hits.size,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * 分析用户输入并推荐表情包指令
 * @param {string} userQuery
 * @param {Object} ctx - 数据库上下文 { path }
 * @returns {Promise<Object>}
 */
export const recommendMemeCommand = async (userQuery, ctx) => {
  try {
    const { keywords, parameters, intent } = await analyzeInput(userQuery);
    const matches = searchByFeature(keywords, ctx);
    const [best, ...alternatives] = matches;

    return {
      success: true,
      query: userQuery,
      recommendation: {
        command: best?.name ?? false,
        confidence: best ? 'HIGH' : 'LOW',
        parameters,
        alternatives: alternatives.slice(0, 2).map(m => m.name),
        intent,
        reason: best
          ? `命中关键词: ${best.matchedKeywords.join(', ')}`
          : '未在库中命中指令，建议使用意图作为候选',
      },
    };
  } catch (error) {
    return {
      success: false,
      query: userQuery,
      error: error.message,
    };
  }
}
