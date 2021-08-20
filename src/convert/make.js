// canvas 合成图片
// 输出base64
// 计算base64图片的原始长宽
// 有趣的图片加密？？？

import {Buffer} from 'buffer';
import * as fs from 'fs';

const getPNGSize = buffer => {
  let w = 16;
  let h = 20;
  if (buffer.toString('ascii', 12, 16) === 'CgBI') {
    w = 32;
    h = 36;
  }
  return {
    width: buffer.readUInt32BE(w),
    height: buffer.readUInt32BE(h)
  };
};

const getJPGSize = buffer => {
  let buffer_data = buffer.slice(4);

  while (buffer_data.length) {
    let i = buffer_data.readUInt16BE(0); // read length of the next block
    let next = buffer_data[i + 1]; // 0xFFC0 is baseline(SOF), 0xFFC2 is progressive(SOF2)
    if (next === 0xC0 || next === 0xC2) {
      return {
        width: buffer_data.readUInt16BE(i + 7),
        height: buffer_data.readUInt16BE(i + 5)
      };
    }

    buffer_data = buffer_data.slice(i + 2); // move to the next block
  }
};

const getGIFSize = buffer => { 
  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  };
};

const typeMap = new Map([
  ['png', getPNGSize],
  ['jpg', getJPGSize],
  ['jpeg', getJPGSize],
  ['gif', getGIFSize]
]);

const getSize = base64Img => {
  const parts = base64Img.split(';base64,');
  const base64Image = parts.pop();
  const buffer = Buffer.from(base64Image.toString(), 'base64');

  const type = parts.pop().split('/').pop();
  const {width, height} = typeMap.get(type)(buffer);

  return {
    width,
    height
  };
};

const getSizeByImage = base64Img => {
  let width = 0;
  let height = 0;

  const img = new Image(); // import pkg from 'canvas'; const { Image } = pkg;
  img.onload = () => {
    width = img.naturalWidth;
    height = img.naturalHeight;
  };
  img.src = base64Img;

  return {
    width,
    height
  }
}

const writeImg = (base64Img, type) => {
  const base64Image = base64Img.split(';base64,').pop();
  fs.writeFileSync(`meme_${new Date().getTime()}.${type}`, base64Image, {encoding: 'base64'});
};

export {
  getSize
};
