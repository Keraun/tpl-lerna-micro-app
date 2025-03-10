const express = require('express');
const fs = require('fs');
const path = require('path');
// const cors = require('cors');

const app = express();

const port = 5173;

const appConfigPath = path.join(__dirname, 'config/register-app.json');
const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));

// 自定义跨域配置
// const corsOptions = {
//   origin: ['http://example1.com', 'http://example2.com'], // 只允许该域名访问
//   methods: 'GET,POST', // 允许的 HTTP 方法
//   allowedHeaders: 'Content-Type,Authorization', // 允许的请求头
//   credentials: true, // 允许发送 cookies
//   optionsSuccessStatus: 200, // 预检请求的响应状态码
// };

// app.use(cors(corsOptions));

// 设置静态资源目录
app.use(express.static(path.join(__dirname, '/dist')));

// 返回app注册信息
app.get('/app-info', (req, res) => {
  const appList = [];
  for (let app of appConfig?.applications) {
    appList.push({ name: app.router, url: `http://localhost:${port}/${app?.router}` });
  }
  res.json(appList);

  res.json({
    router: appList,
    registerInfo: appConfig,
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server  is running on http://localhost:${port}`);
});
