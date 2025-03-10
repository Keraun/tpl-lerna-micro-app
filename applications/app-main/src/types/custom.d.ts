declare module '*.tsx'; // 允许导入 TypeScript 文件
declare module '*.ts';
declare module '@/*'; // 声明路径别名类型

// react-shim.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// 声明 SVG 模块类型
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
