import path from 'path';
import template from './template.js';

const fileName = process.argv.splice(2)[0];
if (!fileName) {
  console.error('请输入文件夹名称!');
  process.exit(1);
}

const PUBLIC = '../assets';

const __dirname = path.resolve();
const tarDir = path.resolve(__dirname, PUBLIC, fileName);

console.log(tarDir);


// 文件夹名字
// 文件名字
// 读取
// 转base64
// 固定格式模板
// 生成js存储
