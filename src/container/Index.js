import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";

function Index(props) {
  // console.log(props);
  let [count, setCount] = useState(1);
  // console.log("props.list", props.list);
  // useEffect(() => {
  //   const getindex = props.getIndexList();
  //   // console.log("getindex", getindex);
  // }, []);
  return (
    <div>
      <h1>
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

Index.loadData = (store) => {
  return store.dispatch(getIndexList());
};

export default connect((state) => ({ list: state.index.list }), {
  getIndexList,
})(Index);
