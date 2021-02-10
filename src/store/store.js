// 存储入口
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import indexReducer from "./index";

const reducer = combineReducers({
  index: indexReducer,
});

// 创建store
const store = createStore(reducer, applyMiddleware(thunk));

// export default store;

export const getClientStore = () => {
  // 客户端store
  // 通过window.__context来获取数据
  const defaultState = window.__context ? window.__context : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk));
};

export const getServerStore = () => {
  // 服务端store
  return createStore(reducer, applyMiddleware(thunk));
};
