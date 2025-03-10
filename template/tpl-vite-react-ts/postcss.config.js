export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions', // 目标浏览器配置
      stage: 3, // 支持 CSS 草案阶段
    },
    autoprefixer: {}, // 自动前缀
    // 'postcss-px-to-viewport': { // 移动端项目的自适应配置
    //   viewportWidth: 375, // 设计稿宽度
    //   unitPrecision: 5,
    //   propList: ['*', '!letter-spacing'], // 需要转换的属性列表
    //   selectorBlackList: ['.ignore'], // 忽略的类名
    //   // exclude: [/src\/pc/], // 排除多个目录
    // },
  },
};
