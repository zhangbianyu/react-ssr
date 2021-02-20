import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
import styles from "./Index.css";
import widthStyle from "../withStyle";

function Index(props) {
  // console.log(props);
  let [count, setCount] = useState(1);
  // console.log("props.list", props.list);
  useEffect(() => {
    // const getindex = props.getIndexList();
    // console.log("getindex", getindex);
    if (!props.list.length) {
      // 客户端获取数据
      props.getIndexList();
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        hello {props.title}! {count}
      </h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        累加
      </button>
      <hr />
      <ul>
        {props.list.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}

// 问题a
// 下面这段代码写法会使ssr失效  会在客户端发起 getIndexList请求
// 原因是loadData绑定在了Index上，但是 connect的参数是widthStyle(Index, styles)，widthStyle中没有拷贝Index的静态方法
// 所以Index绑定的loadData就失效了
Index.loadData = (store) => {
  return store.dispatch(getIndexList());
};

export default connect((state) => ({ list: state.index.list }), {
  getIndexList,
})(widthStyle(Index, styles));

// 问题a 解决办法
// const NewIndex = connect((state) => ({ list: state.index.list }), {
//   getIndexList,
// })(widthStyle(Index, styles));

// NewIndex.loadData = (store) => {
//   return store.dispatch(getIndexList());
// };

// export default NewIndex;

// 或者 在withStyle中 添加loadData  如果用这种写法的话
// 那么上面的代码 就可以不用再定义新的NewIndex
