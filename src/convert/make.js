// canvas 合成图片
// 输出base64
// 有趣的图片加密？？？

// import {Buffer} from 'buffer';
import * as fs from 'fs';

const writeImg = (base64Img, type) => {
  const base64Image = base64Img.split(';base64,').pop();
  fs.writeFileSync(`meme_${new Date().getTime()}.${type}`, base64Image, {encoding: 'base64'});
};

export {
  
};
