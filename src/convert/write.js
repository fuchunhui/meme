import * as fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const named = () => {
  return `meme_${new Date().getTime()}`.padEnd(18, '0');
};

const writeImg = (base64Img, fileName = named(), targetDir = 'output') => {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, {recursive: true});
  }
  const parts = base64Img.split(';base64,');
  const base64Image = parts.pop();
  const type = parts.pop().split('/').pop();
  fs.writeFileSync(`${targetDir}/${fileName}.${type}`, base64Image, {encoding: 'base64'});
};

const removeImg = path => {
  fs.rmSync(path);
};

const testFile = (ipath = 'svg', name = '', targetDir = 'lib') => {
  const filePath = path.resolve(__dirname, targetDir, ipath, `${name}.${ipath}`);
  return fs.existsSync(filePath) ? filePath : false;
};

export {
  named,
  writeImg,
  removeImg,
  testFile
};
