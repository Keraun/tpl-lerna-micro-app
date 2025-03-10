import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { USE_MOCK_API, DEV_PORXY_CONFIG } from './config/dev.config.ts';
import { viteMockServe } from 'vite-plugin-mock';

// 开发环境
const IS_DEV_ENV = process.env.NODE_ENV === 'development';
// 开启mock服务
const ENABLE_MOCK_API = IS_DEV_ENV && USE_MOCK_API;

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    visualizer(),
    viteMockServe({
      mockPath: './__mock__', // Mock 文件存放目录
      logger: true, // 控制台显示请求日志
      enable: ENABLE_MOCK_API,
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要忽略的扩展名列表
    preserveSymlinks: false, // 启用此选项会使 Vite 通过原始文件路径确定文件身份
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
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'promise-polyfill'],
        },
      },
    },
  },
  server: {
    proxy: DEV_PORXY_CONFIG,
  },
});
