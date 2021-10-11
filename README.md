# meme
auto image robot.

### 服务部署
1. 目前本地全局安装了`vercel`，执行下面命令即可。
```
npm run deploy
```


### milk分支
1. 部署node服务到vercel
2. 移除部分无意义代码

### 说明
1. 目前vercel不支持选择node 16.x 版本，故要移除canvas的支持能力(此功能，仅用于查询server暂不需要，canvas包在node14安装不成功)
2. 等vercel支持16.x后或者canvas解决安装依赖问题后，可尝试从主分支上线。
