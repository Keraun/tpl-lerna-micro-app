### 项目初始化

`pnpm install`

### 项目运行

`pnpm run dev`

### 项目构建

`pnpm run build`

主应用默认构建到根目录的/dist目录,子应用在/dist/subapp目录,以子应用的router进行划分文件夹

### 项目单测

`pnpm run test` 或 `lerna run test`

### 添加包依赖

root项目添加依赖,-W 示例[lodash]:
`pnpm add lodash -w`

[所有子应用]添加依赖, 示例[lodash]:
`pnpm add lodash -r --filter '@memoadmin/*'`

[某个子应用]添加依赖, 示例[lodash]:
`pnpm add lodash -r --filter '@memoadmin/mainapp'`

```pnpm参数
-D: 添加到 devDependencies
-S: 添加到 dependencies
--filter：指定特定子包（如 --filter @project/app）
-w：仅针对根项目（如 pnpm add -w eslint）
--parallel：并行执行命令（常与 -r 搭配）
```

### 删除包依赖

- 移除指定子包的全部依赖
  `pnpm remove <package-name> --filter <subpackage-name>`
- 移除全局依赖（所有子包）
  `pnpm remove -r <package-name>`
- 仅移除开发依赖（devDependencies）
  `pnpm remove <package-name> --filter <subpackage-name> -D`
- 强制清理残留文件
  `pnpm remove <package-name> && pnpm install --force`
- 验证依赖是否彻底移除
  `pnpm ls <package-name> --filter <subpackage-name>`

### 如何新建子应用

方案一: 运行命令
`npm run addnewapp`

如果对子应用运行端口需要改动, 请到根目录的package.json里scripts进行修改

方案二: 手动操作

— 1.[复制] /template目录下的 vite-react-tpl-app 子应用模板到 /applications 下
— 2.[改名] 更改子应用文件名称[app-项目名]

- 3.[改名] 更改package.json的name,[@memoadmin/app-项目名]
  — 4.[注册] 注册子应用构建,注册地址在 /bin/register-app.json 的 subapp/list 变量里(ps:router是页面上线后的访问路由配置)
  — 5.[命令] 在根目录的package.json 添加子应用的 scripts 运行命令, 比如 dev:app-demo-1
