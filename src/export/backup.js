import path from 'path';
import fs from 'fs';
import {
  STORY_TABLE,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  MYSTERY_TABLE,
  MATERIAL_TABLE,
  SPECIAL_TABLE,
  ADDITIONAL_TABLE,
  GIF_TABLE,
  getSingleTable
} from '../db/index.js';

const saveData = (targetFile, fileList) => {
  const data = 'export default ' + JSON.stringify(fileList) + ';\n';
  fs.writeFile(targetFile, data, 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
};

const saveSingle = (base, fileName, list) => {
  const targetFile = path.resolve(base, `${fileName}.js`);
  saveData(targetFile, list);
};

const backup = base => {
  const ctx = {
    name: 'meme',
  };
  saveSingle(base, 'story', getStoryData(STORY_TABLE, ctx));
  saveSingle(base, 'text', getTextData(ctx));
  saveSingle(base, 'series', getStoryData(SERIES_TABLE, ctx));
  saveSingle(base, 'feature', getFeatureData(ctx));
  saveSingle(base, 'mystery', getMysteryData(ctx));
  saveSingle(base, 'material', getMaterialData(ctx));
  saveSingle(base, 'special', getStoryData(SPECIAL_TABLE, ctx));
  saveSingle(base, 'additional', getAdditionalData(ctx));
  saveSingle(base, 'gif', getGifData(ctx));
};

const getStoryData = (tableName = STORY_TABLE, ctx) => {
  const list = getSingleTable(tableName, ctx);
  const result = list.map(({mid, title, feature, image, senior}) => {
    return {
      mid,
      title,
      feature,
      image,
      senior
    };
  });

  return result;
};

const getTextData = ctx => {
  const list = getSingleTable(TEXT_TABLE, ctx);
  const result = list.map(({mid, x, y, font, color, align, max, direction, blur, degree,
    stroke = 'transparent', swidth = 1}) => {
    return {
      mid,
      x,
      y,
      font,
      color,
      align,
      max,
      direction,
      blur,
      degree,
      stroke,
      swidth
    };
  });

  return result;
};

const getFeatureData = ctx => {
  const list = getSingleTable(FEATURE_TABLE, ctx);
  const result = list.map(({mid, feature, type, sid, sname, tid, x, y, width, height, ipath}) => {
    return {
      mid,
      feature,
      type,
      sid,
      sname,
      tid,
      x,
      y,
      width,
      height,
      ipath
    };
  });

  return result;
};

const getMaterialData = ctx => {
  const list = getSingleTable(MATERIAL_TABLE, ctx);
  const result = list.map(({mid, feature, title, image}) => {
    return {
      mid,
      feature,
      title,
      image
    };
  });

  return result;
};

const getMysteryData = ctx => {
  const list = getSingleTable(MYSTERY_TABLE, ctx);
  const result = list.map(({title, text, param}) => {
    return {
      title,
      text,
      param
    };
  });

  return result;
};

const getAdditionalData = ctx => {
  const list = getSingleTable(ADDITIONAL_TABLE, ctx);
  const result = list.map(({mid, text}) => {
    return {
      mid,
      text
    };
  });

  return result;
};

const getGifData = ctx => {
  const list = getSingleTable(GIF_TABLE, ctx);
  const result = list.map(({mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame}) => {
    return {mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame};
  });

  return result;
};

export {
  backup
};
