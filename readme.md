### 项目初始化

`pnpm install`

### 项目运行

`pnpm run dev`


### 项目构建

`pnpm run build`


### 项目单测

`pnpm run test` 或 `lerna run test`



### 如何新建子应用
— 1.复制 /template目录下的 vite-react-tpl-app 子应用模板到 /applications 下
— 2.更改子应用文件名称、package.json的name
— 3.注册子应用构建,注册地址在 /bin/register-app的 SUB_APP_LIST 变量里
— 4.在根目录的package.json 添加子应用的 scripts 运行命令, 比如 dev:app-demo-1、 build:app-demo-1

