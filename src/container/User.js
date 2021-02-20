import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user";
import { Redirect } from "react-router-dom";
function User(props) {
  // console.log(props);
  // console.log("props.list", props.list);
  // 没登录跳转  判断cookie 判断localStorage
  return (
    <Redirect to="/about"></Redirect>
    // <div>
    //   <h1>
    //     你好{props.userinfo.title},{props.userinfo.best}
    //   </h1>
    // </div>
  );
}

User.loadData = (store) => {
  return store.dispatch(getUserInfo());
};

export default connect((state) => ({ userinfo: state.user.userinfo }), {
  getUserInfo,
})(User);
