import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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

const parseBase64Image = base64Img => {
  const parts = base64Img.split(';base64,');
  const base64Image = parts.pop();
  const type = (parts.pop()?.split('/').pop() || 'png').toLowerCase();
  const extMap = {
    jpeg: 'jpg',
    'svg+xml': 'svg',
  };
  const ext = extMap[type] || type;

  return {
    ext,
    buffer: Buffer.from(base64Image, 'base64'),
  };
};

const normalizeStaticGroup = group => {
  const value = String(group || '').trim().toLowerCase();
  const sanitized = value.replace(/[\\/]+/g, '_');
  return sanitized || 'default';
};

const ensureStaticDir = group => {
  const targetDir = path.resolve(__dirname, 'lib', 'static', normalizeStaticGroup(group));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, {recursive: true});
  }
  return targetDir;
};

const writeStaticImg = (base64Img, group) => {
  const {ext, buffer} = parseBase64Image(base64Img);
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  const targetDir = ensureStaticDir(group);
  const filePath = path.join(targetDir, `${hash}.${ext}`);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, buffer);
  }

  return {
    hash,
    ext,
  };
};

const getBase64Img = (type, name = '') => {
  const ext = type.toLowerCase() === 'gif' ? 'gif' : 'png';
  const filePath = path.resolve(__dirname, 'lib', ext, `${name}.${ext}`);
  if (!fs.existsSync(filePath)) {
    return '';
  }

  const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
  return `data:image/${ext};base64,${base64Image}`;
};

const getNamedBase64Img = (ext, name = '') => {
  const filePath = path.resolve(__dirname, 'lib', ext, `${name}.${ext}`);
  if (!fs.existsSync(filePath)) {
    return '';
  }

  const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
  return `data:image/${ext};base64,${base64Image}`;
};

const getStaticBase64Img = (hash, ext = 'png', group) => {
  const dirName = normalizeStaticGroup(group);
  const filePath = path.resolve(__dirname, 'lib', 'static', dirName, `${hash}.${ext}`);
  if (!fs.existsSync(filePath)) {
    return '';
  }

  const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
  const mime = ext === 'jpg' ? 'jpeg' : ext;
  return `data:image/${mime};base64,${base64Image}`;
};

const removeStaticImg = (hash, ext = 'png', group) => {
  const dirName = normalizeStaticGroup(group);
  const dirPath = path.resolve(__dirname, 'lib', 'static', dirName);
  const filePath = path.join(dirPath, `${hash}.${ext}`);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }

  if (fs.existsSync(dirPath) && fs.readdirSync(dirPath).length === 0) {
    fs.rmdirSync(dirPath);
  }
};

const getBase64ImgByPath = (ipath = 'svg', name = '') => {
  const realExt = ipath === 'svg' ? 'svg' : 'png'; // 目前只支持 svg 和 png
  const filePath = path.resolve(__dirname, 'lib', ipath, `${name}.${realExt}`);
  if (!fs.existsSync(filePath)) {
    return '';
  }

  let ext = path.extname(filePath).replace('.', '');
  const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
  ext = ext === 'svg' ? 'svg+xml' : ext;
  return `data:image/${ext};base64,${base64Image}`;
};

const tempFile = (type = 'gif', targetDir = 'output', fileName = named()) => {
  return path.resolve(__dirname, targetDir, `${fileName}.${type}`);
};

const removeImg = path => {
  fs.rmSync(path);
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

export {
  writeImg,
  getBase64Img,
  getNamedBase64Img,
  getStaticBase64Img,
  getBase64ImgByPath,
  writeStaticImg,
  removeStaticImg,
  removeImg,
  named,
  tempFile
};
