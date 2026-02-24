/**
 * AI 配置
 * 使用环境变量配置 API Key 和 Base URL
 */
import { createOpenAI } from '@ai-sdk/openai';
import path from 'node:path';

const envPath = path.join(process.cwd(), '.env');
process.loadEnvFile(envPath);

const apiKey = process.env.AI_API_KEY;
const baseURL = process.env.AI_BASE_URL;
const modelName = process.env.AI_MODEL || 'deepseek-v3.2';

if (!apiKey) {
  throw new Error('AI_API_KEY 环境变量未设置');
}

if (!baseURL) {
  throw new Error('AI_BASE_URL 环境变量未设置');
}

// 创建自定义 OpenAI 兼容的 provider
const openai = createOpenAI({
  apiKey,
  baseURL,
  compatibility: 'compatible' // 设置为兼容模式
});

const model = openai.chat(modelName);

export { model };