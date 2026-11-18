// 数据服务器 server.js
// 作者：钱昱同（24002120208）
// 功能：读取同目录下的 db.json，把 poems 数组挂在 /api/poems 接口上
// 启动：在本 db 文件夹里执行  node server.js  （端口 3004）
// express 需先用 npm install express 安装
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const qyt_port = 3004;

// 定义一个 GET 接口 /api/poems
app.get('/api/poems', (req, res) => {
  // 读 db.json（拿到字符串）→ JSON.parse 转对象
  const qyt_data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8')
  );
  // 允许跨域：页面用 file:// 打开也能请求本接口
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.json() 自动帮我们做 JSON.stringify + 设置 Content-Type
  res.json(qyt_data.poems);
});

// 监听 3004 端口
app.listen(qyt_port, () => {
  console.log(`数据服务器已启动: http://localhost:${qyt_port}/api/poems`);
});
