// 存储入口
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import indexReducer from "./index";
import userReducer from "./user";
import axios from "axios";

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer,
});

const serverAxios = axios.create({
  baseURL: "http://localhost:9090/",
});

const clientAxios = axios.create({
  baseURL: "/",
});

// 创建store
// const store = createStore(reducer, applyMiddleware(thunk));
// export default store;

export const getClientStore = () => {
  // 客户端store
  // 通过window.__context来获取数据
  const defaultState = window.__context ? window.__context : {};
  // thunk.withExtraArgument()和 thunk没有本质区别 只是用来带参数
  return createStore(
    reducer,
    defaultState,
    applyMiddleware(thunk.withExtraArgument(clientAxios))
  );
};

export const getServerStore = () => {
  // 服务端store
  // 通过server的dispatch来获取数据
  return createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(serverAxios))
  );
};
