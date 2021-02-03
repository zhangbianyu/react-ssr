const path = require("path");
const nodeExternals = require("webpack-node-externals");

// 服务端的webpack
module.exports = {
  target: "node", //因为服务器和浏览器代码都可以用 JavaScript 编写，所以 webpack 提供了多种构建目标(target),默认是"web",使用 node webpack 会编译为用于「类 Node.js」环境（使用 Node.js 的 require ，而不是使用任意内置模块（如 fs 或 path）来加载 chunk
  mode: "development",
  entry: "./server/index.js",
  externals: [nodeExternals()], //externals 让我们能使用第三方库并且不会被打包到bundle中
  output: {
    filename: "bundle.js", //node 需要编译 需要一个输出的文件
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 这样才能支持 import  支持jsx
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          // @babel/preset-react支持jsx   @babel/preset-env支持最新的js语法
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
    ],
  },
};
