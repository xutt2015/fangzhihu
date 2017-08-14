# install dependencies
npm install

# serve at localhost:3000
npm start --必须先打开mongoose数据库

## 技术栈

nodejs + express + mongodb + mongoose + es6/7 


#vue 移动到express服务器下的方法

1、将vue bulid的dist文件夹移动到服务器。注意bulid前将ajax请求中的/server全部去掉
2、在app.js中配置前端代码路径
app.use(express.static(path.join(__dirname, 'dist')));
