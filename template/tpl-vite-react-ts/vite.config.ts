import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path, { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { DEFAULT_DEV_PORT, USE_MOCK_API, DEV_PORXY_CONFIG } from './config/dev.config.ts';
import { viteMockServe } from 'vite-plugin-mock';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// 开发环境
const IS_DEV_ENV = process.env.NODE_ENV === 'development';

// 开启mock服务
const ENABLE_MOCK_API = IS_DEV_ENV && USE_MOCK_API;
console.log('ENABLE_MOCK', ENABLE_MOCK_API);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    viteMockServe({
      mockPath: './__mock__', // Mock 文件存放目录
      logger: true, // 控制台显示请求日志
      enable: ENABLE_MOCK_API,
    }),
    nodePolyfills({
      include: ['stream'], // 显式包含 stream 的 polyfill
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      // 将 Node.js  的 stream 模块映射到浏览器兼容的 polyfill
      stream: 'stream-browserify',
    },
    dedupe: [], // 强制 Vite 始终将列出的依赖项解析为同一副本
    conditions: [], // 解决程序包中 情景导出 时的其他允许条件
    mainFields: [], // 解析包入口点尝试的字段列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要忽略的扩展名列表
    preserveSymlinks: false, // 启用此选项会使 Vite 通过原始文件路径确定文件身份
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        demo: resolve(__dirname, 'demo.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'promise-polyfill'],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 自定义生成规则
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    // 强制预构建 axios 相关依赖
    include: ['axios', 'stream-browserify'],
  },
  server: {
    port: DEFAULT_DEV_PORT || 3000,
    proxy: DEV_PORXY_CONFIG,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
