import path from 'path';
import fs from 'fs';
import {
  getTable,
  TABLE_NAME,
  SPECIAL_TABLE
} from '../db/index.js';

const getData = (tableName) => {
  const list = getTable(tableName);
  const result = list.map(({title, feature, image, x, y, font, color, align, max}) => {
    return {
      title,
      feature,
      image,
      x,
      y,
      font,
      color,
      align,
      max
    };
  });

  return result;
};

const saveData = (targetFile, fileList) => {
  const data = 'export default ' + JSON.stringify(fileList) + ';\n';
  fs.writeFile(targetFile, data, 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
};

const save = (base, fileName, tableName) => {
  const list = getData(tableName);
  const targetFile = path.resolve(base, `${fileName}.js`);
  saveData(targetFile, list);
};

const backup = base => {
  save(base, 'common', TABLE_NAME);
  save(base, 'special', SPECIAL_TABLE);
};

export {
  backup
};
