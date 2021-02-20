import React from "react";
import ReactDom from "react-dom";
import routes from "../src/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "../src/store/store";
import Header from "../src/component/Header";

// 这里就不能用 render  因为render里既做了dom初始化 又做了事件监听  因为ssr首屏dom已经画好了 所以这边只要注入事件就行
// 注水 客户端入口
const store = getClientStore();
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      {/* {App} */}
      <Header></Header>
      <Switch>
        {routes.map((route) => (
          <Route {...route}></Route>
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
);

// 这里要判断是不是服务端渲染
// 如果有window.__context的话就是服务端渲染 用注水的方式   客户端渲染的话还是用render
// 不判断的话 会报 react-dom.development.js:67 Warning: Expected server HTML to contain a matching <div> in <div>.
// 意思就是服务端渲染的和客户端不一致
if (window.__context) {
  ReactDom.hydrate(Page, document.getElementById("root"));
} else {
  ReactDom.render(Page, document.getElementById("root"));
}
