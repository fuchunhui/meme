import {
  getTable,
  insertTable,
  updateTable,
  updateTextTable,
  getDataByColumn,
  getDataListByColumn,
  getColumnByTable,
  getSingleTable,
  updateFeatureTable,
  getNamedColumnFromTable,
  getRandom,
  updateAdditionalTable,
  updateGifTable,
  insertGifTable,
  updateGifBaseTable,
  STORY_TABLE,
  SPECIAL_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  FEATURE_TYPE,
  TEXT_TABLE,
  FEATURE_IMAGE_TYPE,
  MATERIAL_TABLE,
  ADDITIONAL_TABLE,
  GIF_TABLE
} from '../db/index.js';
import {emptySucess, sucess, error} from './ajax.js';
import {testFile, getFileName, getRandomPath} from '../convert/write.js';
import {convert} from '../convert/base64.js';
import {group, sortBykey, filterKeys} from '../utils/utils.js';
import {
  UPDATE_TEXT_FAIL,
  UPDATE_STORY_FAIL,
  CREATE_REPEAT_TITLE,
  UPDATE_ADDITIONAL_FAIL,
  UPDATE_GIF_FAIL
} from '../config/constant.js';

const COMMAND_ID = {
  [STORY_TABLE]: 'meme_common',
  [FEATURE_TABLE]: 'meme_feature',
  [GIF_TABLE]: 'meme_gif'
};

const COMMAND_TEXT = {
  [STORY_TABLE]: '常用',
  [FEATURE_TABLE]: '高级',
  [GIF_TABLE]: '动图'
};

const COMMAND_TYPE = {
  [STORY_TABLE]: STORY_TABLE,
  [SPECIAL_TABLE]: SPECIAL_TABLE,
  [SERIES_TABLE]: SERIES_TABLE,
  [FEATURE_TABLE]: FEATURE_TABLE,
  [GIF_TABLE]: GIF_TABLE
};

const normalMenu = () => {
  const list = getTable(STORY_TABLE, false);
  return list.filter(item => item.senior === 0 || item.senior === 2).map(item => item.title);
};

const seniorMenu = () => {
  const list = getSingleTable(FEATURE_TABLE);
  return list.filter(item => item.type !== FEATURE_TYPE.COMMAND).map(item => item.feature);
};

const seriesMenu = () => {
  const list = getTable(SERIES_TABLE, false);
  const map = new Map();
  if (list.length) {
    list.forEach(({title, feature}) => {
      let value = [title];
      if (map.has(feature)) {
        value = [...map.get(feature), ...value];
      }
      map.set(feature, value);
    });
  }
  return map;
};

const imageMenu = () => {
  const list = getTable(STORY_TABLE, false);
  const [normal, senior] = group(list, story => story.senior === 0 || story.senior === 2);

  const series = getTable(SERIES_TABLE, false);
  series.forEach(item => item.title = `${item.feature} ${item.title}`);
  sortBykey(series, 'title');

  return {
    normal: filterKeys(normal),
    senior: filterKeys(senior),
    series: filterKeys(series)
  };
};

const gifMenu = () => {
  const list = getTable(GIF_TABLE, false);
  return list.map(item => item.title);
};

const _getStory = (target = []) => {
  const list = getTable(STORY_TABLE, false);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    target.push({
      id: COMMAND_ID[STORY_TABLE],
      text: COMMAND_TEXT[STORY_TABLE],
      type: COMMAND_TYPE[STORY_TABLE],
      children
    });
  }
};

const _getGif = (target = []) => {
  const list = getSingleTable(GIF_TABLE);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    target.push({
      id: COMMAND_ID[GIF_TABLE],
      text: COMMAND_TEXT[GIF_TABLE],
      type: COMMAND_TYPE[GIF_TABLE],
      children
    });
  }
};

const _getFeature = (target = []) => {
  const singleList = getSingleTable(FEATURE_TABLE);
  const children = [];
  singleList.length && singleList.forEach(({mid, feature, type}) => {
    if (type === FEATURE_TYPE.COMMAND) {
      return;
    }
    let cell = {
      mid,
      title: feature,
      type
    };
    children.push(cell);
  });

  target.push({
    id: COMMAND_ID[FEATURE_TABLE],
    text: COMMAND_TEXT[FEATURE_TABLE],
    type: COMMAND_TYPE[FEATURE_TABLE],
    children
  });
};

const _getSeries = (tabName = SERIES_TABLE, target = []) => {
  const list = getTable(tabName, false);
  if (list.length) {
    const map = new Map();
    list.forEach(({mid, title, feature}) => {
      let value = [{
        mid,
        title
      }];
      if (map.has(feature)) {
        value = [...map.get(feature), ...value];
      }
      map.set(feature, value);
    });

    map.forEach((value, key) => {
      target.push({
        id: key,
        text: key,
        type: COMMAND_TYPE[tabName],
        children: value
      });
    });
  }
};

const getCatalog = () => {
  const result = [];

  _getGif(result);
  _getStory(result);
  _getFeature(result);
  _getSeries(SERIES_TABLE, result);
  _getSeries(SPECIAL_TABLE, result);

  return result;
};

const open = (mid, type) => {
  const tabName = COMMAND_TYPE[type];
  const data = getDataByColumn(mid, 'mid', tabName);
  const {title, feature, image, senior, x, y, max, font, color, align, direction, blur, degree, stroke, swidth} = data;

  return {mid, title, feature, image, senior, x, y, max, font, color, align, direction, blur, degree, stroke, swidth};
};

const create = options => {
  const result = checkRepeat(options.title);
  if (result) {
    return result;
  }

  const data = insertTable(options);
  if (data.error) {
    return error(data.data, UPDATE_TEXT_FAIL);
  }

  return sucess({
    mid: data.data
  });
};

const update = options => {
  const data = updateTable(options);
  if (data) {
    return error(data, UPDATE_STORY_FAIL);
  }
  return emptySucess();
};

const updateText = options => {
  const data = updateTextTable(options);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
};

const openFeature = mid => {
  const featureList = getDataListByColumn(mid, 'mid', FEATURE_TABLE);
  const {feature, type, sid, sname, tid, x, y, width, height, ipath} = featureList[0];
  const story = open(sid, sname);
  let cell = {
    mid,
    feature,
    type,
    story
  };

  if ([FEATURE_TYPE.TEXT, FEATURE_TYPE.REPEAT].includes(type)) {
    const textStyles = getDataListByColumn(tid, 'mid', TEXT_TABLE);
    cell.et = textStyles.length ? textStyles[0] : null;
  } else if (type === FEATURE_TYPE.IMAGE) {
    cell.ei = {x, y, width, height, ipath};
  }

  return sucess(cell);
};

const updateFeature = options => {
  const data = updateFeatureTable(options);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
};

const getImagePaths = () => {
  return Object.values(FEATURE_IMAGE_TYPE);
};

const getBase64 = (type, title) => {
  let imageBase64 = '';
  if (type === FEATURE_IMAGE_TYPE.DB) {
    const materialData = getDataListByColumn(title, 'title', MATERIAL_TABLE);
    imageBase64 = materialData.image || '';
  } else if (type === FEATURE_IMAGE_TYPE.RANDOM) {
    const filePath = getRandomPath();
    imageBase64 = convert(filePath);
  } else {
    const filePath = testFile(type.toLowerCase(), title);
    if (filePath) {
      imageBase64 = convert(filePath);
    }
  }

  return imageBase64;
};

const getMaterialCatalog = type => {
  // 根据不同的 type 查找不同的表内容
  let result = [];
  if (type === FEATURE_IMAGE_TYPE.DB) {
    result = getNamedColumnFromTable(MATERIAL_TABLE, ['mid', 'title']);
  } else {
    // 读取不同的物理目录
  }

  return result;
};

const getRandomImageName = (type, ipath) => {
  let content = '';
  if (type === FEATURE_IMAGE_TYPE.DB) {
    const {title} = getRandom(MATERIAL_TABLE, 'title');
    content = title;
  } else {
    content = getFileName(ipath);
  }

  return content;
};

const openAdditional = mid => {
  const additionalList = getDataListByColumn(mid, 'mid', ADDITIONAL_TABLE);
  const {text} = additionalList[0];
  let cell = {
    mid,
    text
  };

  return sucess(cell);
};

const updateAdditional = options => {
  const data = updateAdditionalTable(options);
  if (data) {
    return error(data, UPDATE_ADDITIONAL_FAIL);
  }
  return emptySucess();
};

const openGif = mid => {
  const gifList = getDataListByColumn(mid, 'mid', GIF_TABLE);
  const {title, image, x, y, max, font, color, stroke, swidth, align, direction, frame} = gifList[0];
  const cell = {
    mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame
  };
  return sucess(cell);
};

const updateGif = options => {
  const data = updateGifTable(options);
  if (data) {
    return error(data, UPDATE_GIF_FAIL);
  }
  return emptySucess();
};

const checkRepeat = title => {
  const story = getDataByColumn(title, 'title', STORY_TABLE);
  const gif = getColumnByTable(title, 'title', GIF_TABLE);

  const singleList = getSingleTable(FEATURE_TABLE);
  const children = singleList.map(({mid, feature}) => {
    return {
      mid,
      title: feature
    };
  });

  if (story.mid || gif.mid || children.some(item => item.title === title)) {
    return error({
      title: title
    }, CREATE_REPEAT_TITLE);
  }
  return false;
};

const createGif = options => {
  const result = checkRepeat(options.title);
  if (result) {
    return result;
  }

  const data = insertGifTable(options);
  if (data.error) {
    return error(data.data, UPDATE_GIF_FAIL);
  }

  return sucess({
    mid: data.data
  });
};

const updateGifBase = options => {
  const data = updateGifBaseTable(options);
  if (data) {
    return error(data, UPDATE_GIF_FAIL);
  }
  return emptySucess();
};

export {
  normalMenu,
  seniorMenu,
  seriesMenu,
  imageMenu,
  getCatalog,
  open,
  create,
  update,
  updateText,
  openFeature,
  updateFeature,
  getImagePaths,
  getBase64,
  getMaterialCatalog,
  getRandomImageName,
  openAdditional,
  updateAdditional,
  openGif,
  updateGif,
  createGif,
  updateGifBase,
  gifMenu
};
