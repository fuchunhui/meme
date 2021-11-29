# meme
auto image robot.

way1: by text, send message.

way2: by http, get img.

> 文章详细介绍，详见[掘金-水鳜鱼肥](https://juejin.cn/post/7018395454962401288)


### 使用说明
1. 本地开发，通过`node server.js`启动服务。
2. 在线体验，访问[imeme](https://imeme.vercel.app)。
3. 前端源码参见[meme-view](https://github.com/fuchunhui/meme-view)。

### 图片格式化
1. 把图片文件夹（假如文件夹命名为`test`）放在`assets`目录下，执行命令`node import test`。
2. 在对应test目录下生成`test.js`。

### 数据导入
1. `npm run import` 支持数据批量导入。
2. 交互式单图导入，访问Web端。

### 数据导出
1. `npm run backup` 数据备份到本地。

### 新增支持
1. 引入logo svg资源。
2. 
