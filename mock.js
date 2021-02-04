// 模拟接口
let express = require("express");
const app = express();

app.get("/api/course/list", (req, res) => {
  // 支持跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.json({
    code: 0,
    list: [
      { name: "李1", id: 1 },
      { name: "李2", id: 2 },
      { name: "李3", id: 3 },
      { name: "李4", id: 4 },
    ],
  });
});

app.listen(9090, () => {
  console.log("mock启动");
});
