import React from "react";
import ReactDom from "react-dom";
import App from "../src/App";

// 这里就不能用 render  因为render里既做了dom初始化 又做了事件监听  因为ssr首屏dom已经画好了 所以这边只要注入事件就行
// 注水 客户端入口
ReactDom.hydrate(App, document.getElementById("root"));