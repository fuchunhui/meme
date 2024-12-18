import {
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
  openAdditional,
  updateAdditional,
  openGif,
  updateGif,
  createGif,
  updateGifBase
} from './data.js';

import {COMMAND_LIST} from '../config/constant.js';

const DB_NAME = 'db-name';

const buildCtx = req => {
  const path = req.get(DB_NAME) || 'meme';
  return {
    path
  };
};

const listen = app => {
  app.use('/', (req, res, next) => {
    if (req.path.startsWith('/butter')) {
      req.url = req.url.replace('/butter', '/image');
      req.headers[DB_NAME] = 'butter';
    }

    next();
  });

  app.get('/image/catalog', (req, res) => {
    const ctx = buildCtx(req);
    const data = getCatalog(ctx);

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/image/open', (req, res) => {
    console.info('image ope1n: ', ctx, req.query);
    const ctx = buildCtx(req);
    const {mid, type} = req.query;
    const data = open(mid, type, ctx);

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.post('/image/save', (req, res) => {
    console.info('image save: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = updateText(req.body, ctx);
    res.send(data);
  });

  app.post('/image/create', (req, res) => {
    console.info('image create: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = create(req.body, ctx);
    res.send(data);
  });

  app.post('/image/update', (req, res) => {
    console.info('image update: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = update(req.body, ctx);
    res.send(data);
  });

  app.get('/image/download', (req, res) => {
    console.info('备用接口', req, res);
  });

  app.get('/image/export', (req, res) => {
    console.info('备用接口', req, res);
  });

  app.get('/image/config', (req, res) => {
    const data = {
      commands: COMMAND_LIST,
      paths: getImagePaths()
    };
    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/image/feature/open', (req, res) => {
    const ctx = buildCtx(req);
    const {mid} = req.query;
    const data = openFeature(mid, ctx);
    res.send(data);
  });

  app.post('/image/feature/save', (req, res) => {
    console.info('image feature save: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = updateFeature(req.body, ctx);
    res.send(data);
  });

  app.get('/image/base64', (req, res) => {
    const ctx = buildCtx(req);
    const {ipath, value} = req.query;
    const data = getBase64(ipath, value, ctx);
    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/image/additional', (req, res) => {
    const ctx = buildCtx(req);
    const {mid} = req.query;
    const data = openAdditional(mid, ctx);
    res.send(data);
  });

  app.post('/image/additional/update', (req, res) => {
    console.info('additional update: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = updateAdditional(req.body, ctx);
    res.send(data);
  });

  app.get('/image/gif/open', (req, res) => {
    const ctx = buildCtx(req);
    const {mid} = req.query;
    const data = openGif(mid, ctx);

    res.send(data);
  });

  app.post('/image/gif/save', (req, res) => {
    console.info('gif save: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = updateGif(req.body, ctx);
    res.send(data);
  });

  app.post('/image/gif/create', (req, res) => {
    console.info('gif create: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = createGif(req.body, ctx);
    res.send(data);
  });

  app.post('/image/gif/update', (req, res) => {
    console.info('gif update: ', JSON.stringify(req.body));
    const ctx = buildCtx(req);
    const data = updateGifBase(req.body, ctx);
    res.send(data);
  });

  app.get('/material/catalog', (req, res) => {
    const ctx = buildCtx(req);
    const {type} = req.query;
    const data = getMaterialCatalog(type.toUpperCase(), ctx);

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });
};

export {
  listen
};
