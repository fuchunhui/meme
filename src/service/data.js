import crypto from 'crypto';
import {getMid} from '../utils/keys.js';
import {writeImg} from '../convert/write.js';

// 从统一的 db 模块导入
import {
  ELEMENT_TYPE,
  IMAGE_TYPE,
  ELEMENT_TABLE,
  getDataListByColumn,
  STORY_TYPE,
  STORY_TABLE,
  createStory,
  getStoryByMid,
  getStoryByName,
  getAllStories,
  updateStory,
  createElement,
  getElementsByStoryId,
  getElementsByStoryIdAndType,
  createText,
  getTextByEid,
  updateText,
  getTextsByEids,
  createImage,
  getImageByEid,
  updateImage,
  createGif,
  updateGif,
} from '../db/index.js';

import {emptySucess, sucess, error} from './ajax.js';
import {getBase64Img} from '../convert/write.js';
import {convert} from '../convert/base64.js';
import {group, arrayToCountObject} from '../utils/utils.js';
import {
  CREATE_STORY_FAIL,
  CREATE_TEXT_FAIL,
  CREATE_GIF_FAIL,
  CREATE_IMAGE_FAIL,
  UPDATE_TEXT_FAIL,
  UPDATE_IMAGE_FAIL,
  UPDATE_NAME_FAIL,
  CREATE_REPEAT_NAME
} from '../config/constant.js';

const normalMenu = ctx => {
  const storyList = getAllStories(ctx).map(({mid, name, md5}) => ({mid, name, md5}));

  const countMap = {};
  storyList.forEach(story => {
    const elements = getElementsByStoryId(story.mid, ctx);
    countMap[story.mid] = elements.length;
  });
  
  const [normal, senior] = group(storyList, item => countMap[item.mid] === 1);
  return {
    normal,
    senior
  };
};

const gifMenu = ctx => {
  // 查询 Story 表中 type = GIF 的条目，避免扫描所有元素
  const gifStories = getDataListByColumn(STORY_TYPE.GIF, 'type', STORY_TABLE, ctx);
  return (gifStories || []).map(s => s.name);
};

const normalImageMenu = ctx => {
  const {normal, senior} = normalMenu(ctx);
  const normalList = normal.map(({name, md5}) => {
    const image = getBase64Img(IMAGE_TYPE.TEXT, md5);
    return {name, image};
  });
  const seniorList = senior.map(({name, md5}) => {
    const image = getBase64Img(IMAGE_TYPE.TEXT, md5);
    return {name, image};
  });
  return {
    normal: normalList,
    senior: seniorList
  };
};

const getCatalog = ctx => {
  const list = getAllStories(ctx);
  if (!list.length) return [];

  return list.map(({mid, name}) => {
    const elements = getElementsByStoryId(mid, ctx);
    const type = elements.length > 0 ? elements[0].type : IMAGE_TYPE.TEXT;
    return {mid, name, type};
  });
};

const open = (mid, ctx) => {
  const story = getStoryByMid(mid, ctx);
  if (!story) return null;
  
  const {name, md5} = story;
  const elements = getElementsByStoryId(mid, ctx);
  
  // 获取所有文本元素的配置
  const textElements = elements.filter(el => el.type === ELEMENT_TYPE.TEXT);
  const textEids = textElements.map(el => el.eid);
  const children = getTextsByEids(textEids, ctx);
  
  // 判断主要类型和获取额外信息
  let type = IMAGE_TYPE.TEXT;
  let more = '';
  
  const imageElements = elements.filter(el => el.type === ELEMENT_TYPE.IMAGE);
  const isGifStory = story.type === STORY_TYPE.GIF;
  // const additionalElements = elements.filter(el => el.type === ELEMENT_TYPE.ADDITIONAL);

  if (imageElements.length > 0) {
    type = IMAGE_TYPE.IMAGE;
    const imageData = getImageByEid(imageElements[0].eid, ctx);
    if (imageData) {
      const {x, y, width, height, ipath} = imageData;
      more = {x, y, width, height, ipath};
    }
  } else if (isGifStory) {
    type = IMAGE_TYPE.GIF;
  }
  
  const image = getBase64Img(type, md5);

  return {
    mid,
    name,
    type,
    image,
    children,
    more
  };
};

const create = (options, ctx) => {
  const result = checkRepeat(options.name, ctx);
  if (result) {
    return result;
  }

  const {name, type, image} = options;
  const mid = getMid();
  const md5 = crypto.createHash('md5').update(name).digest('hex');

  try {
    const storyType = type === IMAGE_TYPE.GIF ? STORY_TYPE.GIF : STORY_TYPE.TEXT;
    createStory(mid, name, md5, '', storyType, ctx);
    writeImg(md5, image);

    // 创建默认文本元素
    const textEid = `${mid}_text_0`;
    createElement(textEid, mid, ELEMENT_TYPE.TEXT, 0, true, ctx);
    createText(textEid, {}, ctx);

    // 根据类型创建相应的元素
    if (type === IMAGE_TYPE.GIF) {
      const gifEid = `${mid}_gif_0`;
      // GIF is represented at story level; create an IMAGE element as the container
      createElement(gifEid, mid, ELEMENT_TYPE.IMAGE, -1, true, ctx);
      createGif(gifEid, { frame: 'NORMAL' }, ctx);
    } else if (type === IMAGE_TYPE.IMAGE) {
      const imageEid = `${mid}_image_0`;
      createElement(imageEid, mid, ELEMENT_TYPE.IMAGE, -1, true, ctx);
      createImage(imageEid, {}, ctx);
    }

    return sucess({ mid });
  } catch (err) {
    return error(err.toString(), CREATE_STORY_FAIL);
  }
};

const update = (params, ctx) => {
  const {mid, options, more, type} = params;

  try {
    const elements = getElementsByStoryId(mid, ctx);
    
    // 更新文本元素（默认更新第一个文本元素）
    const textElements = elements.filter(el => el.type === ELEMENT_TYPE.TEXT);
    if (textElements.length > 0) {
      updateText(textElements[0].eid, options, ctx);
    }
    
    // 根据类型更新相应元素
    if (type === IMAGE_TYPE.IMAGE && more) {
      const imageElements = elements.filter(el => el.type === ELEMENT_TYPE.IMAGE);
      if (imageElements.length > 0) {
        updateImage(imageElements[0].eid, more, ctx);
      }
    // } else if (type === 'ADDITIONAL' && more) {
    //   const additionalElements = elements.filter(el => el.type === ELEMENT_TYPE.ADDITIONAL);
    //   if (additionalElements.length > 0) {
    //     updateAdditional(additionalElements[0].eid, more, ctx);
    //   }
    }
    
    return emptySucess();
  } catch (err) {
    return error(err.toString(), UPDATE_TEXT_FAIL);
  }
};

const updateStoryName = (options, ctx) => {
  try {
    const {mid, name} = options;
    updateStory(mid, { name }, ctx);
    return emptySucess();
  } catch (err) {
    return error(err.toString(), UPDATE_NAME_FAIL);
  }
};

// 待优化，为【上号】类的需求，提供物理文件的信息
const getBase64 = (type, name, ctx) => {
  let imageBase64 = '';
  // const filePath = getRandomPath();
  // imageBase64 = convert(filePath);

  // const filePath = testFile(type.toLowerCase(), name);
  // if (filePath) {
  //   imageBase64 = convert(filePath);
  // }

  return imageBase64;
};

const getOptions = (mid, type, md5, ctx) => {
  const image = getBase64Img(type, md5);
  const elements = getElementsByStoryIdAndType(mid, ELEMENT_TYPE.TEXT, ctx);
  const textEids = elements.map(el => el.eid);
  const children = getTextsByEids(textEids, ctx);

  return {
    mid,
    image,
    children
  };
}

const checkRepeat = (name, ctx) => {
  const story = getStoryByName(name, ctx);

  if (story && story.mid) {
    return error({ name }, CREATE_REPEAT_NAME);
  }
  return false;
};

const getLatestMid = (time, ctx) => {
  const result = [];

  const storyList = getAllStories(ctx);
  storyList.forEach(({mid, name}) => {
    if (mid.replace('meme_', '') >= time) {
      result.push(name);
    }
  });

  return Array.from(new Set(result));
};

export {
  normalMenu,
  gifMenu,
  normalImageMenu,
  getCatalog,
  open,
  create,
  update,
  updateStoryName,
  getOptions,
  getBase64,
  getLatestMid
};
