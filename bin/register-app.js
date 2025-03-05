const path = require("path");

// 注册app用,用于文件映射, 构建路径

// 子应用构建到哪个文件夹
const SUBAPP_PATH = "subapp";
const DIST_PATH = "dist";

// 主应用文件名
const MAIN_APP_FILE_NAME = "app-main";

// 子应用注册
const SUB_APP_LIST = [
  {
    fileName: "app-demo-1",
    routerName: "appdemo1",
  },
  {
    fileName: "app-demo-2",
    routerName: "appdemo2",
  },
  {
    fileName: "app-demo-3",
    routerName: "appdemo3",
  },
];

module.exports = { MAIN_APP_FILE_NAME, SUB_APP_LIST, SUBAPP_PATH, DIST_PATH };
