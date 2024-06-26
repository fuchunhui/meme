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

const listen = app => {
  app.get('/image/catalog', (req, res) => {
    const data = getCatalog();

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/image/open', (req, res) => {
    const {mid, type} = req.query;
    const data = open(mid, type);

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.post('/image/save', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = updateText(req.body);
    res.send(data);
  });

  app.post('/image/create', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = create(req.body);
    res.send(data);
  });

  app.post('/image/update', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = update(req.body);
    res.send(data);
  });

  app.get('/image/download', (req, res) => {
    console.log('备用接口', req, res);
  });

  app.get('/image/export', (req, res) => {
    console.log('备用接口', req, res);
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
    const {mid} = req.query;
    const data = openFeature(mid);
    res.send(data);
  });

  app.post('/image/feature/save', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = updateFeature(req.body);
    res.send(data);
  });

  app.get('/material/base64', (req, res) => {
    const {ipath, value} = req.query;
    const data = getBase64(ipath, value);
    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/material/catalog', (req, res) => {
    const {type} = req.query;
    const data = getMaterialCatalog(type.toUpperCase());

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/image/additional', (req, res) => {
    const {mid} = req.query;
    const data = openAdditional(mid);
    res.send(data);
  });

  app.post('/image/additional/update', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = updateAdditional(req.body);
    res.send(data);
  });

  app.get('/image/gif/open', (req, res) => {
    const {mid} = req.query;
    const data = openGif(mid);

    res.send(data);
  });

  app.post('/image/gif/save', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = updateGif(req.body);
    res.send(data);
  });

  app.post('/image/gif/create', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = createGif(req.body);
    res.send(data);
  });

  app.post('/image/gif/update', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = updateGifBase(req.body);
    res.send(data);
  });
};

export {
  listen
};
