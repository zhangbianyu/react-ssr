import React from "react";
import ReactDom from "react-dom";
import routes from "../src/App";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "../src/store/store";

// 这里就不能用 render  因为render里既做了dom初始化 又做了事件监听  因为ssr首屏dom已经画好了 所以这边只要注入事件就行
// 注水 客户端入口
const store = getClientStore();
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      {/* {App} */}
      {routes.map((route) => (
        <Route {...route}></Route>
      ))}
    </BrowserRouter>
  </Provider>
);
ReactDom.hydrate(Page, document.getElementById("root"));
