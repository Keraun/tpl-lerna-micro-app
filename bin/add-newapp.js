import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  // 步骤 1: 选择项目模版
  const templateChoices = ['vite-react-tpl-app'];
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: '选择项目模版',
      choices: templateChoices,
    },
  ]);

  // 步骤 2: 输入复制后的新文件夹的名称
  const { newFolderName } = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'newFolderName',
        message: '输入子应用文件夹名称(会自动添加前缀app-)',
        default: '',
      },
    ])
    .then((answers) => {
      if (!answers?.newFolderName) {
        console.error('❌ 文件夹名称不能输入为空!\n');
        process.exit(1);
      } else {
        console.log(`即将文件夹:app-${answers?.newFolderName}`);
      }
      return answers;
    });

  const finallyFolderName = `app-${newFolderName}`;

  // 步骤 3: 输入页面访问路由
  const { rouerName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'rouerName',
      message: `输入子应用访问路由名称(默认为文件夹名:${finallyFolderName})`,
      default: finallyFolderName,
    },
  ]);

  // 步骤 3: 输入启动端口号
  const { port } = await inquirer.prompt([
    {
      type: 'input',
      name: 'port',
      message: '输入子应用启动端口号(默认:5000)',
      default: '5000',
    },
  ]);

  const fullPackageName = `@memoadmin/${finallyFolderName}`;

  //步骤1:  复制模版文件夹到 applications 目录
  const templatePath = path.join(__dirname, '..', 'template', template);
  const destinationPath = path.join(__dirname, '..', 'applications', finallyFolderName);
  await fs.copy(templatePath, destinationPath);

  //步骤2: 更新新文件夹的 package.json 的 name
  const packageJsonPath = path.join(destinationPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = fullPackageName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  //步骤3: 注册app, 更新bin/register-app.json 文件夹的数据
  const appJsonPath = path.join(__dirname, '..', 'bin/register-app.json');
  const appJson = await fs.readJson(appJsonPath);
  appJson.subApp.list.push({
    name: finallyFolderName,
    router: rouerName,
    packageName: fullPackageName,
  });
  await fs.writeJson(appJsonPath, appJson, { spaces: 2 });

  // 步骤 4: 为根目录的 package.json  的 scripts 添加运行指令
  const rootPackageJsonPath = path.join(__dirname, '..', 'package.json');
  const rootPackageJson = await fs.readJson(rootPackageJsonPath);

  const startDevCli = `pnpm --filter ${fullPackageName} dev --port ${port}`;

  rootPackageJson.scripts[`dev:${finallyFolderName}`] = startDevCli;

  await fs.writeJson(rootPackageJsonPath, rootPackageJson, { spaces: 2 });

  console.log(
    [
      `✅ 创建子应用操作完成！`,
      `— 文件路径: /applications/${finallyFolderName}`,
      `- 项目空间: ${fullPackageName}`,
      `- 启动命令: ${startDevCli}`,
    ].join('\n')
  );

  console.log(`\n如需修改子应用启动端口号,请到root项目的package.json进行修改`);
})();
