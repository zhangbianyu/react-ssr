import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

function withStyle(Comp, styles) {
  // return function (props) {
  //   if (props.staticContext) {
  //     // server特有的写法
  //     // console.log("index.css", styles._getCss());
  //     props.staticContext.css.push(styles._getCss());
  //   }
  //   return <Comp {...props} />;
  // };

  // 第二种写法 为了使原来组件中的loadData正常使用
  // 但是这种写法不是很优雅，因为高阶函数中并不知道你的静态方法名叫 loadData
  // function NewComp(props) {
  //   if (props.staticContext) {
  //     // server特有的写法
  //     // console.log("index.css", styles._getCss());
  //     props.staticContext.css.push(styles._getCss());
  //   }
  //   return <Comp {...props} />;
  // }
  // NewComp.loadData = Comp.loadData;
  // return NewComp;

  // 再或者  参考https://reactjs.org/docs/higher-order-components.html  页面拉到最下面
  // 有一节标题叫 Static Methods Must Be Copied Over
  // 就是说 HOC必须拷贝静态方法
  // 使用hoist-non-react-statics 来拷贝所有的静态方法
  // 代码如下
  function NewComp(props) {
    if (props.staticContext) {
      // server特有的写法
      // console.log("index.css", styles._getCss());
      props.staticContext.css.push(styles._getCss());
    }
    return <Comp {...props} />;
  }
  hoistNonReactStatic(NewComp, Comp);
  // NewComp.loadData = Comp.loadData;
  return NewComp;
}

export default withStyle;
