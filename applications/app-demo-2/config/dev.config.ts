// 默认dev启动端口号
export const DEFAULT_DEV_PORT = 3000;
// 使用mock.js api 模拟(只在dev环境生效)
export const USE_MOCK_API = true;
// 配置本地dev代理转发服务器
export const DEV_PORXY_CONFIG = {};

// export default {
//   '/api': {
//     // 多路径代理配置
//     target: 'http://api.example.com',
//     changeOrigin: true,
//     rewrite: (path) => path.replace(/^\/api/, ''),
//   },

//   '/uploads': {
//     target: 'http://static.example.com',
//     changeOrigin: true,
//   },
//   '^/user/.*': {
//     // 通过正则表达式灵活匹配复杂路径：
//     // 匹配所有以 /user/ 开头的请求
//     target: 'http://user-service.com',
//     changeOrigin: true,
//   },
//   '/socket': {
//     target: 'ws://your-websocket-server',
//     ws: true, //配置 ws: true 可代理 WebSocket 请求：
//   },
// };
