import path from 'path';
import fs from 'fs';
import template from './template.js';

const fileName = process.argv.splice(2)[0];
if (!fileName) {
  console.error('请输入文件夹名称!');
  process.exit(1);
}

const PUBLIC = 'assets';

const __dirname = path.resolve();
const tardir = path.resolve(__dirname, PUBLIC, fileName);

// 判断是否存在
if (!fs.existsSync(tardir)) {
  console.error('文件夹不存在，请输入正确的名称!');
  process.exit(1);
}

const EXT_RULES = ['.jpeg', '.jpg', '.png', '.gif', '.bmp']; // 目前支持格式列表

const appendBase64 = (buffer, ext) => {
  return `data:image${ext.replace('.', '/')};base64,${buffer}`;
};

let fileList = [];

fs.readdir(tardir, (err, files) => {
  files.forEach(item => {
    const filePath = path.resolve(tardir, item);
    const ext  = path.extname(filePath);
    if (!EXT_RULES.includes(ext)) {
      return;
    }

    const data = fs.readFileSync(filePath, {encoding: 'base64'});
    const base64 = appendBase64(data, ext);

    fileList.push({
      title: item.replace(ext, ''),
      image: base64
    });
  });

  fileList = fileList.map(item => {
    return {
      ...template,
      ...item,
      feature: fileName
    }
  });

  const saveData = 'export default ' + JSON.stringify(fileList) + ';\n';
  const targetFile = path.resolve(tardir, `${fileName}.js`);
  
  fs.writeFile(targetFile, saveData, 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
});
