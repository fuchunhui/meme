import {getCatalog, open} from './data.js';

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
    // {"mid":"meme_1630929517998","title":"happy","feature":"happy","image":"","x":-10,"y":220,"max":123,"font":"32px sans-serif","color":"#FF0000","align":"end"}
    // const {} = req.body
    // 调用服务
    // 存储到db
    // post message
  });
};

export {
  listen
};
