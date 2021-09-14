import {getCatalog} from './data.js';

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
    console.log('catalog: ', req.body);

    res.send('catalog open. 打开单个文件');
  });

  app.post('/image/save', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    // 调用服务
  });
};

export {
  listen
};
