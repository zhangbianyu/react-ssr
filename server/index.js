// 这里的node代码，会用babel处理
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { Provider } from "react-redux";
import routes from "../src/App";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { getServerStore } from "../src/store/store";

const store = getServerStore();
const app = express();
app.use(express.static("public")); //注意这里用的是public下的静态文件，是client端打包的目录  这样就和client端关联起来了

app.get("*", (req, res) => {
  // 获取根据路由渲染出的组件，并且拿到loadData方法 获取数据

  // 存储网络请求
  const promises = [];
  routes.some((route) => {
    const match = matchPath(req.path, route);
    // if (match) promises.push(route.loadData());
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        promises.push(loadData(store));
      }
    }
    // return match;
  });

  // 等待所有网络请求结束再渲染
  Promise.all(promises).then(() => {
    // const Page = <App title="张三"></App>;
    // 把react组件解析成html
    const content = renderToString(
      <Provider store={getServerStore()}>
        {/* 这边别忘记给location */}
        <StaticRouter location={req.url}>
          {/* {App} */}
          {routes.map((route) => (
            <Route {...route}></Route>
          ))}
        </StaticRouter>
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
        <script>
          window.__context = ${JSON.stringify(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
    `);
  });
});

app.listen(9093, () => {
  console.log("监听完毕");
});
