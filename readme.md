### 项目初始化

`pnpm install`

### 项目运行

`pnpm run dev`

### 项目构建

`pnpm run build`

### 项目单测

`pnpm run test` 或 `lerna run test`

### 添加包依赖

root项目添加依赖,-W 示例[lodash]:
`pnpm add lodash -w`

[所有子应用]添加依赖, 示例[lodash]:
`pnpm add lodash -r --filter '@memoapp/*'`

[某个子应用]添加依赖, 示例[lodash]:
`pnpm add lodash -r --filter '@memoapp/mainapp'`

```pnpm参数
-D: 添加到 devDependencies
-S: 添加到 dependencies
--filter：指定特定子包（如 --filter @project/app）
-w：仅针对根项目（如 pnpm add -w eslint）
--parallel：并行执行命令（常与 -r 搭配）
```

### 如何新建子应用

— 1.复制 /template目录下的 vite-react-tpl-app 子应用模板到 /applications 下
— 2.更改子应用文件名称、package.json的name, 以@memoapp为前缀,格式为: @memoapp/具体的项目名
— 3.注册子应用构建,注册地址在 /bin/register-app的 SUB_APP_LIST 变量里
— 4.在根目录的package.json 添加子应用的 scripts 运行命令, 比如 dev:app-demo-1
