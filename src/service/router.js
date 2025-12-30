import express from 'express';

import {
  getCatalog,
  open,
  create,
  update,
  updateStoryName,
  getBase64
} from './data.js';

import {COMMAND_LIST} from '../config/constant.js';

const DB_NAME = 'db-name';

const router = express.Router();

const buildCtx = req => {
  const path = req.get(DB_NAME) || 'meme';
  return {
    path
  };
};

router.use((req, res, next) => {
  if (req.path.startsWith('/butter')) {
    req.url = req.url.replace('/butter', '/image');
    req.headers[DB_NAME] = 'butter';
  }

  next();
});

// 此接口已可以正常工作，新建接口完毕 ✅
router.get('/image/catalog', (req, res) => {
  const ctx = buildCtx(req);
  const data = getCatalog(ctx);

  res.json({
    data,
    errNo: 0,
    message: 'success'
  });
});

// TODO 0812 根据不同的类型，返回不同的明细数据
router.get('/image/open', (req, res) => {
  const ctx = buildCtx(req);
  const {mid} = req.query;
  const data = open(mid, ctx);

  res.json({
    data,
    errNo: 0,
    message: 'success'
  });
});

// 单图上传，然后选择类型，调用不同类型的初始化方案，确认功能。接口验证通过 ✅
router.post('/image/create', (req, res) => {
  console.info('image create: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = create(req.body, ctx);
  res.json(data);
});

// TODO 不同类型，不同的保存接口，基础调用统一逻辑，然后差别处理不同部分 ✅
router.post('/image/update', (req, res) => {
  console.info('image update: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = update(req.body, ctx);
  res.json(data);
});

// image/upload 上传图片接口，支持多个图片上传

// 更新 story name 的接口 ✅
router.post('/image/update/name', (req, res) => {
  console.info('image save: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = updateStoryName(req.body, ctx);
  res.json(data);
});

router.get('/image/download', (req, res) => {
  console.info('备用接口', req, res);
});

router.get('/image/export', (req, res) => {
  console.info('备用接口', req, res);
});

router.get('/image/config', (req, res) => {
  const data = {
    commands: COMMAND_LIST
  };
  res.json({
    data,
    errNo: 0,
    message: 'success'
  });
});

// 暂时保留，原始从 Feature 表获取 IMAGE 类型的图片 base64数据，可以废弃
router.get('/image/base64', (req, res) => {
  const ctx = buildCtx(req);
  const {ipath, value} = req.query;
  const data = getBase64(ipath, value, ctx);
  res.json({
    data,
    errNo: 0,
    message: 'success'
  });
});

export {
  router
};
