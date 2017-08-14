# fangzhihu

### 1、服务器搭建
# install dependencies
npm install

# serve at localhost:3000
npm start --必须先打开mongoose数据库

## 技术栈

nodejs + express + mongodb + mongoose + es6/7 

### 2、web搭建

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 技术栈

vue + element-ui+ vuex + vue-router + es6/7 

## 目标功能

- [x] 注册 -- 完成
- [x] 登录 -- 完成
- [x] 发表问题 -- 完成
- [x] 问题赞同和反对 -- 完成
- [x] 问题删除 -- 完成
- [x] 评论及回复 -- 完成
- [x] 搜索 -- 未完成
- [x] 收藏 -- 未完成


### 3、vue 移动到express服务器下的方法

1、将vue bulid的dist文件夹移动到服务器。注意bulid前将ajax请求中的/server全部去掉
2、在app.js中配置前端代码路径
app.use(express.static(path.join(__dirname, 'dist')));