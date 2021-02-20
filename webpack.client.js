const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.csr.html",
      template: "src/index.csr.html",
      inject: true,
    }),
  ],
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
      {
        test: /\.css$/,
        // 从右向左解析，
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
