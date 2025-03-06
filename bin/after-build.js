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
function getFinalSubAppDistPath(appRouterName = '') {
  return path.join(FINAL_BUILD_DIST_PATH, appConfig?.subApp?.buildPath, appRouterName);
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

    // 复制主应用 dist 文件
    await execPromise(`cp -rf ${MAIN_APP_DIST_PATH}/* ${FINAL_BUILD_DIST_PATH}`);

    await execPromise(`mkdir -p ${getFinalSubAppDistPath('')}`);

    for (const subapp of appConfig?.subApp?.list) {
      const source = getAppDistPath(subapp?.name);

      const routerName = subapp?.router || subapp?.name || 'unknow';
      const target = getFinalSubAppDistPath(routerName);

      if (!fs.existsSync(source)) {
        console.warn(`[ 跳过] ${subapp} 无构建产物`);
        continue;
      }

      await execPromise(`cp -rf ${source} ${target}`);

      console.log(
        `✅ 完成子应用 ${subapp.name} 的dist产物聚合到 /${appConfig?.buildPath}/${appConfig?.subApp?.buildPath}/${routerName}`
      );
    }
  } catch (error) {
    console.error('❌  聚合失败:', error.message);
    process.exit(1);
  }
})();
