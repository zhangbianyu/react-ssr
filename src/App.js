import React from "react";
import { Route } from "react-router-dom";
import Index from "./container/Index";
import About from "./container/About";
import User from "./container/User";
import Notfound from "./container/Notfound";
// import "./App.css";
// function App() {
//   return (
//     <div>
//       <Route path="/" exact component={Index}></Route>
//       <Route path="/about" exact component={About}></Route>
//     </div>
//   );
// }

// export default <App></App>;

// 改成js的配置，才能获取组件
export default [
  {
    path: "/",
    component: Index,
    exact: true,
    key: "index",
    // loadData: Index.loadData,
    // 路由嵌套
    // routes:[{}]
  },
  { path: "/about", component: About, exact: true, key: "about" },
  { path: "/user", component: User, exact: true, key: "user" },
  { component: Notfound, key: "notfound" },
];
