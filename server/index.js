// 这里的node代码，会用babel处理
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { Provider } from "react-redux";
import App from "../src/App";
import { StaticRouter } from "react-router-dom";
import store from "../src/store/store";

const app = express();
app.use(express.static("public")); //注意这里用的是public下的静态文件，是client端打包的目录  这样就和client端关联起来了

app.get("*", (req, res) => {
  // const Page = <App title="张三"></App>;
  // 把react组件解析成html
  const content = renderToString(
    <Provider store={store}>
      {/* 这边别忘记给location */}
      <StaticRouter location={req.url}>{App}</StaticRouter>
    </Provider>
  );
  // 字符串模板
  res.send(`
  <html>
    <head>
      <mate charset="utf-8"/>
      <title>react ssr</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="bundle.js"></script>
    </body>
  </html>
  `);
});

app.listen(9093, () => {
  console.log("监听完毕");
});
