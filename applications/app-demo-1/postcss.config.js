export default {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions', // 目标浏览器配置
      stage: 3, // 支持 CSS 草案阶段
    },
    autoprefixer: {},
  },
};
