/**
 * 命令行运行说明
 * 只更新 feature 为空的记录：pnpm run ai:feature -- --only-empty
 * 
 * 指定记录更新（优先级：--id > --mid > --name）：
 * pnpm run ai:feature -- --id 12
 * pnpm run ai:feature -- --mid meme_1770776501086
 * pnpm run ai:feature -- --name 爱因斯坦
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';
import { generateText as aiGenerateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(process.cwd(), '.env');
process.loadEnvFile(envPath);

const anthropicApiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_API_KEY;
const anthropicBaseURL = process.env.ANTHROPIC_BASE_URL || process.env.AI_BASE_URL;
const anthropicModelName = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620';

if (!anthropicApiKey) {
  throw new Error('未设置 ANTHROPIC_API_KEY（或 AI_API_KEY）');
}

if (!anthropicBaseURL) {
  throw new Error('未设置 ANTHROPIC_BASE_URL（或 AI_BASE_URL）');
}

const anthropic = createAnthropic({
  apiKey: anthropicApiKey,
  baseURL: anthropicBaseURL,
});

const model = anthropic.chat(anthropicModelName);

const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {
    onlyEmpty: false,
    id: null,
    mid: null,
    name: null,
  };

  args.forEach((arg, idx) => {
    if (arg === '--only-empty') {
      options.onlyEmpty = true;
    } else if (arg === '--id') {
      options.id = args[idx + 1] ? Number(args[idx + 1]) : null;
    } else if (arg === '--mid') {
      options.mid = args[idx + 1] || null;
    } else if (arg === '--name') {
      options.name = args[idx + 1] || null;
    }
  });

  return options;
};

const isEmptyFeature = value => value === null || value === undefined || String(value).trim() === '';

async function main() {
  console.log('开始运行 agent-example：从 public/db/meme.db 读取 Story 表并填充 feature 字段');

  const options = parseArgs();
  if (options.id || options.mid || options.name) {
    console.log(`仅更新指定记录: ${options.id ? `id=${options.id}` : options.mid ? `mid=${options.mid}` : `name=${options.name}`}`);
  }
  if (options.onlyEmpty) {
    console.log('仅更新 feature 为空的记录');
  }

  // DB 文件路径
  const dbPath = path.resolve(__dirname, '..', '..', 'public', 'db', 'meme.db');
  if (!fs.existsSync(dbPath)) {
    console.error('找不到数据库文件:', dbPath);
    process.exit(1);
  }

  // 动态加载 sqlite3（可选依赖）；如果没有则退回 sql.js
  let dbAdapter = null;
  try {
    const mod = await import('sqlite3');
    const sqlite3 = mod.default || mod;
    const db = new (sqlite3.verbose().Database)(dbPath);
    const allAsync = util.promisify(db.all.bind(db));
    const runAsync = (sql, params) => new Promise((res, rej) => db.run(sql, params, function (err) {
      if (err) return rej(err); res(this); }));
    dbAdapter = {
      type: 'sqlite3',
      all: (sql, params = []) => allAsync(sql, params),
      run: (sql, params = []) => runAsync(sql, params),
      close: () => db.close()
    };
    console.log('使用 sqlite3 直接访问数据库。');
  } catch (e) {
    console.log('sqlite3 不可用，尝试使用 sql.js 读取/写入数据库。');
    try {
      const mod = await import('sql.js');
      const initSqlJs = mod.default || mod;
      const SQL = await initSqlJs({
        locateFile: file => path.resolve(__dirname, '..', '..', 'node_modules', 'sql.js', 'dist', file)
      });
      const fileBuffer = fs.readFileSync(dbPath);
      const db = new SQL.Database(new Uint8Array(fileBuffer));
      dbAdapter = {
        type: 'sqljs',
        all: (sql, params = []) => {
          const stmt = db.prepare(sql);
          stmt.bind(params);
          const rows = [];
          while (stmt.step()) rows.push(stmt.getAsObject());
          stmt.free();
          return rows;
        },
        run: (sql, params = []) => {
          db.run(sql, params);
          return Promise.resolve();
        },
        close: () => {
          const data = db.export();
          fs.writeFileSync(dbPath, Buffer.from(data));
          db.close();
        }
      };
    } catch (err) {
      console.error('sqlite3 与 sql.js 均不可用，无法读取数据库。');
      process.exit(1);
    }
  }

  let rows;
  try {
    rows = await dbAdapter.all('SELECT rowid, * FROM Story');
  } catch (e) {
    console.error('读取 Story 表出错:', e.message);
    process.exit(1);
  }

  const baseLib = path.resolve(process.cwd(), 'lib');

  const resolveRowKey = (row) => {
    if (!row || typeof row !== 'object') return null;
    if (row.id !== undefined && row.id !== null) return { col: 'id', val: row.id };
    const rowid = row.rowid ?? row.ROWID ?? row._rowid_ ?? row._ROWID_ ?? null;
    if (rowid !== null && rowid !== undefined) return { col: 'rowid', val: rowid };
    return null;
  };

  for (const row of rows) {
    try {
      const rowKey = resolveRowKey(row);
      if (!rowKey) {
        console.warn('跳过没有主键的记录:', row);
        continue;
      }

      if (options.onlyEmpty && !isEmptyFeature(row.feature)) {
        continue;
      }

      if (options.id && Number(row.id) !== options.id) {
        continue;
      }

      if (options.mid && String(row.mid || '') !== options.mid) {
        continue;
      }

      if (options.name && String(row.name || '').toLowerCase() !== String(options.name).toLowerCase()) {
        continue;
      }
      const md5 = String(row.md5 || '').trim();
      const type = (String(row.type || '')).toLowerCase();

      // 参考项目逻辑：图片保存在 lib/png 或 lib/gif，文件名为 md5
      const ext = type === 'gif' ? 'gif' : 'png';
      const imagePath = path.resolve(baseLib, ext, `${md5}.${ext}`);

      if (!fs.existsSync(imagePath)) {
        throw new Error(`图片文件不存在: ${imagePath}`);
      }

      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
      const mimeType = ext === 'gif' ? 'image/gif' : 'image/png';

      // 合成 feature 文本：结合 name + AI 图片理解
      const name = row.name || '';

      const prompt = `你是表情包释义助手。
输入信息：
- 表情名称: ${name}

请结合图片内容，输出几个简短释义词汇，每个词汇 2-4 个字，
要求：
- 只输出纯文本，不要加前缀或标点列表
- 用中文
- 每个图片对应多个词汇，结果用逗号分隔
`;

      let feature = '';
      try {
        const aiResult = await aiGenerateText({
          model,
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image', image: { data: imageBase64, mimeType } }
            ]
          }],
          maxTokens: 120
        });
        feature = aiResult.text.trim();
      } catch (err) {
        const aiResult = await aiGenerateText({
          model,
          messages: [{ role: 'user', content: `${prompt}\n（图片解析失败，请仅根据名称与类型给出释义）` }],
          maxTokens: 120
        });
        feature = aiResult.text.trim();
      }

      // 更新数据库
      await dbAdapter.run(`UPDATE Story SET feature = ? WHERE ${rowKey.col} = ?`, [feature, rowKey.val]);
      console.log(`已更新 ${rowKey.col}=${rowKey.val} 名称=${name} -> feature 长度=${feature.length}`);
    } catch (e) {
      console.error('处理行出错:', e && (e.stack || e.message || e));
    }
  }

  dbAdapter.close();
  console.log('全部完成。');
}

main().catch(e => { console.error(e); process.exit(1); });

