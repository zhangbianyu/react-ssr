import React from "react";
import { Route } from "react-router-dom";
import Index from "./container/Index";
import About from "./container/About";

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
  },
  { path: "/about", component: About, exact: true, key: "about" },
];
