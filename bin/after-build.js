import fs from 'fs';
import path from 'path';
import { execPromise } from './util.js';

// 根路径
const ROOT_PATH = process.cwd();

const appConfig = JSON.parse(
  fs.readFileSync(path.join(ROOT_PATH, 'config/register-app.json'), 'utf8')
);

// 最后构建产物的dist路径
const FINAL_BUILD_DIST_PATH = path.join(ROOT_PATH, appConfig?.buildPath || '');
// 最后构建产物的文件夹路径
const FINAL_BUILD_FLODER = path.join(FINAL_BUILD_DIST_PATH, appConfig?.buildFloder || '');

// 最后构建产物应用的dist路径
function getFinalAppDistPath(appRouterName = '') {
  return path.join(FINAL_BUILD_FLODER, appRouterName);
}

// 获取应用路径的path
function getAppPath(appFileName) {
  return path.join(ROOT_PATH, 'applications', appFileName);
}

// 获取子应用路径dist的path
function getAppDistPath(appFileName) {
  return path.join(ROOT_PATH, 'applications', appFileName, 'dist');
}

// 主流程
(async () => {
  try {
    await execPromise(`rm -rf ${FINAL_BUILD_DIST_PATH}`);
    await execPromise(`mkdir -p ${FINAL_BUILD_DIST_PATH}`);
    await execPromise(`mkdir -p ${FINAL_BUILD_FLODER}`);

    // 复制子应用 dist 文件
    for (const app of appConfig?.applications) {
      const source = getAppDistPath(app?.name);

      const routerName = app?.router || app?.name || 'unknow';
      const target = getFinalAppDistPath(routerName);

      if (!fs.existsSync(source)) {
        console.warn(`[ 跳过] ${app?.name} 无构建产物`);
        continue;
      }

      await execPromise(`cp -rf ${source} ${target}`);
      if (app?.isMainApp) {
        // 主应用同样复制一份信息
        await execPromise(`cp -rf ${source} ${ROOT_PATH}`);
      }

      console.log(`✅ 完成子应用 ${app?.name} 的dist产物聚合到 / ${routerName}`);
    }
  } catch (error) {
    console.error('❌  聚合失败:', error.message);
    process.exit(1);
  }
})();
