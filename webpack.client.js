const path = require("path");

// 服务端的webpack
module.exports = {
  mode: "development",
  // 客户端入口
  entry: "./client/index.js",
  // 输出
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
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
