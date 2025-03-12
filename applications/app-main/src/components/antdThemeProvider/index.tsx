import { FC, ReactNode } from 'react';
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import themeConfig from './theme.json';

type ThemeProviderProps = {
  children: ReactNode;
  darkMode?: boolean;
};

const cache = createCache();

const AntdThemeProvider: FC<ThemeProviderProps> = ({ children, darkMode = false }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const mergedTheme: ThemeConfig = {
    ...themeConfig,
    algorithm: darkMode ? [darkAlgorithm] : [defaultAlgorithm],
    components: {
      ...themeConfig.components,
    },
  };

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider theme={mergedTheme} componentSize='middle'>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdThemeProvider;
