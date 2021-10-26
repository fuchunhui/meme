import * as child from 'child_process';
import * as fs from 'fs';
import path from 'path';
import { named, writeImg, removeImg } from "../convert/write.js";

const convertBMP = base64 => {
  const fileName = named();
  writeImg(base64, fileName);
  evoke(fileName);
};

const evoke = fileName => {
  console.log('需要处理: ', fileName);

  const str = child.execFileSync('python3', ['src/process/convert.py', 'output', fileName]);
  console.log(str.toString());
  console.log(fs.existsSync(`output/${fileName}.jpg`), '11111');
}

export {
  convertBMP
}