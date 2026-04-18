import crypto from 'crypto';
import { getMid } from '../utils/keys.js';
import {
  STORY_TYPE,
  createStory,
  getStoryByName,
  getStoryByMid,
  getAllStories,
  createStaticItem,
  getStaticItemsByMid,
  getStaticItemById,
  getStaticItemByHash,
  deleteStaticItemById,
  insertStaticSendLog,
  getRecentStaticSentItemIds,
} from '../db/index.js';
import { error, sucess } from './ajax.js';
import { getStaticBase64Img, removeStaticImg, writeStaticImg } from '../convert/write.js';

const STATIC_RETURN_COUNT = 5;
const STATIC_RECENT_HISTORY = 30;

const CREATE_STATIC_FAIL = '创建静态表情集合失败';
const STATIC_STORY_NOT_FOUND = '静态表情集合不存在';
const DELETE_STATIC_ITEM_FAIL = '删除静态表情失败';

const sampleWithoutReplacement = (list, count) => {
  const pool = list.slice();
  const result = [];

  while (pool.length && result.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool[index]);
    pool.splice(index, 1);
  }

  return result;
};

const createStaticCollection = (params, ctx) => {
  const { name, feature = '', images = [], tags = '' } = params;
  if (!name || !Array.isArray(images) || images.length === 0) {
    return error('name 和 images 必填，且 images 不能为空', CREATE_STATIC_FAIL);
  }

  const repeat = getStoryByName(name, ctx);
  if (repeat) {
    return error({ name }, '已经存在相同命令的表情，你需要换个名称哦');
  }

  const mid = getMid();
  const md5 = crypto.createHash('md5').update(name).digest('hex');

  try {
    createStory(mid, name, md5, feature, STORY_TYPE.STATIC, ctx);

    let count = 0;
    images.forEach(image => {
      const { hash, ext } = writeStaticImg(image, name);
      const exists = getStaticItemByHash(mid, hash, ctx);
      if (!exists) {
        createStaticItem(mid, hash, ext, tags, ctx);
        count += 1;
      }
    });

    return sucess({ mid, count });
  } catch (err) {
    return error(err.toString(), CREATE_STATIC_FAIL);
  }
};

const addStaticItems = (params, ctx) => {
  const { mid, images = [], tags = '' } = params;
  const story = getStoryByMid(mid, ctx);
  if (!story || story.type !== STORY_TYPE.STATIC) {
    return error(mid, STATIC_STORY_NOT_FOUND);
  }

  if (!Array.isArray(images) || images.length === 0) {
    return error('images 不能为空', CREATE_STATIC_FAIL);
  }

  let count = 0;
  images.forEach(image => {
    const { hash, ext } = writeStaticImg(image, story.name);
    const exists = getStaticItemByHash(mid, hash, ctx);
    if (!exists) {
      createStaticItem(mid, hash, ext, tags, ctx);
      count += 1;
    }
  });

  return sucess({ mid, count });
};

const getStaticCatalog = ctx => {
  const stories = getAllStories(ctx).filter(item => item.type === STORY_TYPE.STATIC);
  const data = stories.map(item => {
    const children = getStaticItemsByMid(item.mid, ctx);
    return {
      mid: item.mid,
      name: item.name,
      feature: item.feature,
      count: children.length,
    };
  });

  return sucess(data);
};

const getStaticItems = (mid, ctx) => {
  const story = getStoryByMid(mid, ctx);
  if (!story || story.type !== STORY_TYPE.STATIC) {
    return error(mid, STATIC_STORY_NOT_FOUND);
  }

  const data = getStaticItemsByMid(mid, ctx).map(item => ({
    id: item.id,
    hash: item.hash,
    ext: item.ext,
    tags: item.tags,
    created_at: item.created_at,
  }));

  return sucess(data);
};

const getStaticItemImage = (id, ctx) => {
  const item = getStaticItemById(id, ctx);
  if (!item) {
    return error(id, '静态表情不存在');
  }

  const story = getStoryByMid(item.mid, ctx);
  if (!story || story.type !== STORY_TYPE.STATIC) {
    return error(id, STATIC_STORY_NOT_FOUND);
  }

  const image = getStaticBase64Img(item.hash, item.ext, story.name);
  return sucess({
    id: item.id,
    image,
  });
};

const deleteStaticItem = (id, ctx) => {
  try {
    const item = getStaticItemById(id, ctx);
    if (!item) {
      return error(id, DELETE_STATIC_ITEM_FAIL);
    }

    const story = getStoryByMid(item.mid, ctx);
    if (!story || story.type !== STORY_TYPE.STATIC) {
      return error(id, STATIC_STORY_NOT_FOUND);
    }

    deleteStaticItemById(id, ctx);
    removeStaticImg(item.hash, item.ext, story.name);

    return sucess({ id });
  } catch (err) {
    return error(err.toString(), DELETE_STATIC_ITEM_FAIL);
  }
};

const pickStaticImages = ({ mid, fromid, count = STATIC_RETURN_COUNT, recentLimit = STATIC_RECENT_HISTORY }, ctx) => {
  const story = getStoryByMid(mid, ctx);
  if (!story || story.type !== STORY_TYPE.STATIC) {
    return [];
  }

  const allItems = getStaticItemsByMid(mid, ctx);
  if (!allItems.length) {
    return [];
  }

  const recentIds = new Set(getRecentStaticSentItemIds(fromid, mid, recentLimit, ctx));
  const preferred = allItems.filter(item => !recentIds.has(item.id));

  let selected = sampleWithoutReplacement(preferred, count);
  if (selected.length < count) {
    const used = new Set(selected.map(item => item.id));
    const fallbackPool = allItems.filter(item => !used.has(item.id));
    selected = selected.concat(sampleWithoutReplacement(fallbackPool, count - selected.length));
  }

  const payload = [];
  selected.forEach(item => {
    const content = getStaticBase64Img(item.hash, item.ext, story.name);
    if (!content) {
      return;
    }

    payload.push({ type: 'IMAGE', content });
    insertStaticSendLog({
      fromid,
      mid,
      itemId: item.id,
      date: new Date(),
      ctx,
    });
  });

  return payload;
};

export {
  STATIC_RETURN_COUNT,
  createStaticCollection,
  addStaticItems,
  getStaticCatalog,
  getStaticItems,
  getStaticItemImage,
  deleteStaticItem,
  pickStaticImages,
};
