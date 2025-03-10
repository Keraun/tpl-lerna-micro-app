export default {
  testEnvironment: 'jsdom', // 必须设置 DOM 环境
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              // 关键配置：启用自动导入 React
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    // 处理 CSS/SCSS 模块
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    // 路径别名（需与 vite.config.ts  中 alias 一致）
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.(spec|test).(js|ts|tsx)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
