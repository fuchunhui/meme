import * as fs from 'fs';
import path from 'path';

const appendBase64 = (buffer, ext) => {
  let template = ext;
  if (ext === '.svg') {
    template = '.svg+xml';
  }
  return `data:image${template.replace('.', '/')};base64,${buffer}`;
};

const convert = filePath => {
  const data = fs.readFileSync(filePath, {encoding: 'base64'});
  const ext = path.extname(filePath);
  const base64 = appendBase64(data, ext);
  return base64;
};

export {
  convert
};
