// 这里的node代码，会用babel处理
import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { Provider } from "react-redux";
import routes from "../src/App";
import { StaticRouter, matchPath, Route, Switch } from "react-router-dom";
import { getServerStore } from "../src/store/store";
import Header from "../src/component/Header";
import { createProxyMiddleware } from "http-proxy-middleware";

const store = getServerStore();
const app = express();

app.use(express.static("public")); //注意这里用的是public下的静态文件，是client端打包的目录  这样就和client端关联起来了
// 客户端来的api开头的请求
app.use(
  "/api",
  createProxyMiddleware({ target: "http://localhost:9090", changeOrigin: true })
);

function csrRender(res) {
  // 读取csr文件 返回
  // console.log("process.cwd()", process.cwd());
  const filename = path.resolve(process.cwd(), "public/index.csr.html");
  const html = fs.readFileSync(filename, "utf-8");
  return res.send(html);
}

app.get("*", (req, res) => {
  // 配置开关开启csr
  // 服务器负载过高  开启csr
  if (req.query._mode == "csr") {
    // console.log("csr降级");
    return csrRender(res);
  }
  // 获取根据路由渲染出的组件，并且拿到loadData方法 获取数据

  // if (req.url.startsWith("/api/")) {
  //   // 不渲染页面，使用axios转发 axios.get
  // }

  // 存储网络请求
  const promises = [];
  routes.some((route) => {
    const match = matchPath(req.path, route);
    // if (match) promises.push(route.loadData());
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        // 包装Promise
        // 规避报错  可以考虑加日志
        const promise = new Promise((resolve, reject) => {
          // console.log("ssss");
          loadData(store).then(resolve).catch(resolve);
        });
        promises.push(promise);
        // promises.push(loadData(store));
      }
    }
    // return match;
  });

  // 等待所有网络请求结束再渲染
  // 这边用all有个问题，一旦其中有接口报错，就会走catch，影响其他接口的渲染
  // 可以用Promise.finally,就是不管有没有接口报错，都会进行渲染，缺点是并不能在finally之后拿到所有数据的结果
  // 还有一个api : Promise.allSettled(promises) 这个的作用就是当all里面有部分接口报错之后也会返回正常接口的结果
  Promise.all(promises)
    // Promise.allSettled(promises)
    .then(() => {
      // const Page = <App title="张三"></App>;
      const context = {
        css: [],
      };
      // 把react组件解析成html
      const content = renderToString(
        <Provider store={store}>
          {/* 这边别忘记给location */}
          <StaticRouter location={req.url} context={context}>
            {/* {App} */}
            <Header></Header>
            <Switch>
              {routes.map((route) => (
                <Route {...route}></Route>
              ))}
            </Switch>
          </StaticRouter>
        </Provider>
      );
      // console.log("context", context);
      if (context.statuscode) {
        // 状态的切换和页面跳转
        res.status(context.statuscode);
      }
      console.log("context.action", context.action);
      if (context.action == "REPLACE") {
        res.redirect(301, context.url);
      }

      const css = context.css.join("\n");

      // 字符串模板
      res.send(`
    <html>
      <head>
        <mate charset="utf-8"/>
        <title>react ssr</title>
        <style>
          ${css}
        </style>
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
    })
    .catch((e) => {
      res.send("报错了");
    });
});

app.listen(9093, () => {
  console.log("监听完毕");
});
