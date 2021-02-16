import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";

function User(props) {
  // console.log(props);
  // console.log("props.list", props.list);
  return (
    <div>
      <h1>
        你好{props.title},{props.best}
      </h1>
    </div>
  );
}

User.loadData = (store) => {
  return store.dispatch(getIndexList());
};

export default connect((state) => ({ list: state.index.list }), {
  getIndexList,
})(User);
