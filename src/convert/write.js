import * as fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const named = () => {
  return `meme_${new Date().getTime()}`.padEnd(18, '0');
};

const writeImg = (fileName, base64Img) => {
  const parts = base64Img.split(';base64,');
  const base64Image = parts.pop();
  const type = parts.pop().split('/').pop();

  const targetDir = path.resolve(__dirname, 'lib', type === 'gif' ? 'gif' : 'png');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, {recursive: true});
  }

  fs.writeFileSync(`${targetDir}/${fileName}.${type}`, base64Image, {encoding: 'base64'});
};

const getBase64Img = (type, md5) => {
  const ext = type.toLowerCase() === 'gif' ? 'gif' : 'png';
  const filePath = path.resolve(__dirname, 'lib', ext, `${md5}.${ext}`);
  if (!fs.existsSync(filePath)) {
    return '';
  }

  const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
  return `data:image/${ext};base64,${base64Image}`;
};



// 暂时没用，原来用于测试生成效果的函数
const writeTempImg = (base64Img, fileName = named(), targetDir = 'output') => {
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
  const backPath = path.resolve(__dirname, targetDir, 'png', `${name}.png`); // 兼容 png 路径

  const existPath = fs.existsSync(filePath)
    ? filePath
    : fs.existsSync(backPath)
      ? backPath
      : false;
  return existPath;
};

const getFileName = (ipath = 'svg', targetDir = 'lib') => {
  const tardir = path.resolve(__dirname, targetDir, ipath);
  const files = fs.readdirSync(tardir);
  const index = Math.floor(Math.random() * files.length);
  const file = files[index];
  const ext = path.extname(file);
  return file.slice(0, file.length - ext.length);
};

const tempFile = (type = 'gif', fileName = named(), targetDir = 'output') => {
  return path.resolve(__dirname, targetDir, `${fileName}.${type}`);
};

export {
  writeImg,
  getBase64Img,


  named,
  removeImg,
  testFile,
  getFileName,
  tempFile
};
