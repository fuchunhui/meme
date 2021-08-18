import express from 'express';
const app = express();

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const hostName = '127.0.0.1';
const port = 8080;

app.all('*', (req, res, next) => {  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/get', (req, res) => {
  console.log(`url: ${req.path} 参数: ${req.query}`);
  res.send('这是get请求');
})

app.post('/post', (req, res) => {
  console.log('请求参数：', req.body, JSON.stringify(req.body));
  const result = {code: 200, msg: 'post请求成功'};
  res.send(result);
});

app.listen(port, hostName, () => {
  console.log(`服务器运行在 http://${hostName}:${port}`);
});
