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

const getFileName = (ipath = 'svg', targetDir = 'lib') => {
  const tardir = path.resolve(__dirname, targetDir, ipath);
  const files = fs.readdirSync(tardir);
  const index = Math.floor(Math.random() * files.length);
  const file = files[index];
  const ext = path.extname(file);
  return file.slice(0, file.length - ext.length);
};

const getRandomPath = (ipath = 'random', targetDir = 'lib') => {
  const tardir = path.resolve(__dirname, targetDir, ipath);
  const files = fs.readdirSync(tardir);
  const index = Math.floor(Math.random() * files.length);
  const file = files[index];
  return path.resolve(tardir, file);
};

const tempFile = (type = 'gif', fileName = named(), targetDir = 'output') => {
  return path.resolve(__dirname, targetDir, `${fileName}.${type}`);
};

export {
  named,
  writeImg,
  removeImg,
  testFile,
  getFileName,
  getRandomPath,
  tempFile
};
