import fs from 'fs';
import path from 'path';
import { execPromise } from './util.js';

// 根路径
const ROOT_PATH = process.cwd();

const appConfig = JSON.parse(
  fs.readFileSync(path.join(ROOT_PATH, 'bin/register-app.json'), 'utf8')
);

// 最后构建产物的dist路径
const FINAL_BUILD_DIST_PATH = path.join(ROOT_PATH, appConfig?.buildPath);

// 最后构建产物子应用的dist路径
function getFinalchildAppDistPath(appRouterName = '') {
  return path.join(FINAL_BUILD_DIST_PATH, appConfig?.childApp?.buildPath, appRouterName);
}

// 获取应用路径的path
function getAppPath(appFileName) {
  return path.join(ROOT_PATH, 'applications', appFileName);
}

// 获取子应用路径dist的path
function getAppDistPath(appFileName) {
  return path.join(ROOT_PATH, 'applications', appFileName, 'dist');
}

// 主应用构建的dist目录
const MAIN_APP_DIST_PATH = getAppDistPath(appConfig?.mainApp?.name);

// 主流程
(async () => {
  try {
    await execPromise(`rm -rf ${FINAL_BUILD_DIST_PATH}`);
    await execPromise(`mkdir -p ${FINAL_BUILD_DIST_PATH}`);
    await execPromise(`mkdir -p ${FINAL_BUILD_DIST_PATH}/main-app`);
    // 复制主应用 dist 文件
    await execPromise(`cp -rf ${MAIN_APP_DIST_PATH}/* ${FINAL_BUILD_DIST_PATH}/main-app`);

    await execPromise(`mkdir -p ${getFinalchildAppDistPath('')}`);

    for (const childApp of appConfig?.childApp?.list) {
      const source = getAppDistPath(childApp?.name);

      const routerName = childApp?.router || childApp?.name || 'unknow';
      const target = getFinalchildAppDistPath(routerName);

      if (!fs.existsSync(source)) {
        console.warn(`[ 跳过] ${childApp} 无构建产物`);
        continue;
      }

      await execPromise(`cp -rf ${source} ${target}`);

      console.log(
        `✅ 完成子应用 ${childApp.name} 的dist产物聚合到 /${appConfig?.buildPath}/${appConfig?.childApp?.buildPath}/${routerName}`
      );
    }
  } catch (error) {
    console.error('❌  聚合失败:', error.message);
    process.exit(1);
  }
})();
