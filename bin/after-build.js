const fs = require("fs");
const path = require("path");
const fse = require("fs-extra"); // 使用更高效的文件库[6]()
const { exec } = require("child_process");
const {
  MAIN_APP_FILE_NAME,
  SUB_APP_LIST,
  SUBAPP_PATH,
  DIST_PATH,
} = require("./register-app");

// 根路径
const ROOT_PATH = process.cwd();

// 最后构建产物的dist路径
const FINAL_BUILD_DIST_PATH = path.join(ROOT_PATH, DIST_PATH);

// 最后构建产物子应用的dist路径
function getFinalSubAppDistPath(appRouterName = "") {
  return path.join(FINAL_BUILD_DIST_PATH, SUBAPP_PATH, appRouterName);
}

// 获取应用路径的path
function getAppPath(appFileName) {
  return path.join(ROOT_PATH, "applications", appFileName);
}

// 获取子应用路径dist的path
function getAppDistPath(appFileName) {
  return path.join(ROOT_PATH, "applications", appFileName, "dist");
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
}

// 主应用构建的dist目录
const MAIN_APP_DIST_PATH = getAppDistPath(MAIN_APP_FILE_NAME);

// 主流程
(async () => {
  try {
    await execPromise(`rm -rf ${FINAL_BUILD_DIST_PATH}`);
    await execPromise(`mkdir -p ${FINAL_BUILD_DIST_PATH}`);

    // 复制主应用 dist 文件
    await execPromise(
      `cp -rf ${MAIN_APP_DIST_PATH}/* ${FINAL_BUILD_DIST_PATH}`
    );

    await execPromise(`mkdir -p ${getFinalSubAppDistPath()}`);

    for (const subapp of SUB_APP_LIST) {
      const source = getAppDistPath(subapp.fileName);
      const target = getFinalSubAppDistPath(subapp.routerName);

      if (!fs.existsSync(source)) {
        console.warn(`[ 跳过] ${subapp} 无构建产物`);
        continue;
      }

      await execPromise(`cp -rf ${source} ${target}`);

      console.log(
        `✅ 完成子应用 ${subapp.fileName} 的dist产物聚合到 /${DIST_PATH}/${SUBAPP_PATH}/${subapp.routerName}`
      );
    }
  } catch (error) {
    console.error("❌  聚合失败:", error.message);
    process.exit(1);
  }
})();
