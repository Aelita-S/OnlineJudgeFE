# OnlineJudge Front End
[![vue](https://img.shields.io/badge/vue-2.5.13-blue.svg?style=flat-square)](https://github.com/vuejs/vue)
[![vuex](https://img.shields.io/badge/vuex-3.0.1-blue.svg?style=flat-square)](https://vuex.vuejs.org/)
[![echarts](https://img.shields.io/badge/echarts-3.8.3-blue.svg?style=flat-square)](https://github.com/ecomfe/echarts)
[![iview](https://img.shields.io/badge/iview-2.8.0-blue.svg?style=flat-square)](https://github.com/iview/iview)
[![element-ui](https://img.shields.io/badge/element-2.0.9-blue.svg?style=flat-square)](https://github.com/ElemeFE/element)
[![Build Status](https://travis-ci.org/QingdaoU/OnlineJudgeFE.svg?branch=master)](https://travis-ci.org/QingdaoU/OnlineJudgeFE)

>### A multiple pages app built for OnlineJudge. [Demo](https://qduoj.com)

## Features

+ Webpack3 multiple pages with bundle size optimization
+ Easy use simditor & Nice codemirror editor
+ Amazing charting and visualization(echarts)
+ User-friendly operation
+ Quite beautiful：)

## 开始

> 先安装 nodejs **v8.12.0**

+ ### Linux:
```bash
git clone https://github.com/QingdaoU/OnlineJudgeFE.git

cd .\OnlineJudgeFE

npm install
# we use webpack DllReference to decrease the build time,

npm config set registry https://registry.npm.taobao.org --global # 设置淘宝镜像
npm install webpack -g

# this command only needs execute once unless you upgrade the package in build/webpack.dll.conf.js
NODE_ENV=development npm run build:dll

# the dev-server will set proxy table to your backend
export TARGET=http://Your-backend

npm install webpack -g
# serve with hot reload at localhost:8080
```

+ ### Windows:
```bash
git clone https://github.com/QingdaoU/OnlineJudgeFE.git

cd .\OnlineJudgeFE

npm install
# we use webpack DllReference to decrease the build time,

npm config set registry https://registry.npm.taobao.org --global # 设置淘宝镜像
npm install webpack -g

# this command only needs execute once unless you upgrade the package in build/webpack.dll.conf.js
npm run build:dll

```
> 打开文件 \OnlineJudgeFE\config\index.js，起始位置加入一行以指定后台数据来源

<code>process.env.TARGET = 'http://Your-backend'</code>
```bash
# serve with hot reload at localhost:8080
npm run dev
```
> 修改完成后打包生成dist文件夹
```bash
npm run build
```
> dist文件夹传输到服务器

> 在服务器OnlineJudgeDeploy下，打开OJ配置文件docker-compose.yml
```bash
oj-backend:
image: registry.cn-hangzhou.aliyuncs.com/onlinejudge/oj_backend
container_name: oj-backend
restart: always
depends_on:
– oj-redis
– oj-postgres
– judge-server
volumes:
– $PWD/data/backend:/data
– /home/zzh/dist:/app/dist # 新增此行，路径请根据实际情况修改
environment:
– POSTGRES_DB=onlinejudge
– POSTGRES_USER=onlinejudge
– POSTGRES_PASSWORD=onlinejudge
– JUDGE_SERVER_TOKEN=CHANGE_THIS
# – FORCE_HTTPS=1
# – STATIC_CDN_HOST=cdn.oj.com
ports:
– "0.0.0.0:80:8000"
– "0.0.0.0:443:1443"
```

```bash
sudo -E docker-compose up -d # 更新前端
```

## Screenshots

[Check here.](https://github.com/QingdaoU/OnlineJudge)

## Browser Support

Modern browsers and Internet Explorer 10+.

## LICENSE

[MIT](http://opensource.org/licenses/MIT)
