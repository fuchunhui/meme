# meme
Auto image robot.

case one: by text, send message.
case two: by http, get img.

> 文章详细介绍，详见[掘金-水鳜鱼肥](https://juejin.cn/post/7018395454962401288)


## 使用说明
1. 本地开发，通过`node server.js`启动服务。
2. 在线体验，访问[imeme](https://imeme.vercel.app)。
3. 表情管理端源码参见[meme-view](https://github.com/fuchunhui/meme-view)。

### 图片格式化
1. 把图片文件夹（假如文件夹命名为`test`）放在`assets`目录下，执行命令`node import test`。
2. 在对应test目录下生成`test.js`。

### 数据导入
1. `npm run import` 支持数据批量导入。
2. 交互式单图导入，访问Web端。

### 数据导出
1. `npm run backup` 数据备份到本地。


## Canvas 安装说明
1. [node-canvas](https://github.com/Automattic/node-canvas) 是在 Node 使用 Canvas 的必备基础，安装成功比较关键，通常安装失败的次数远多于正常安装次数。
2. 由于`node-canvas`包没有提供基于 arm64 的预安装处理，M2芯环境安装会提示各种错误，我们采用源码方式安装解决这个问题。
3. 解决步骤写在这个 issue 中，[node-canvas#2251](https://github.com/Automattic/node-canvas/issues/2251#issuecomment-1595637400)。
