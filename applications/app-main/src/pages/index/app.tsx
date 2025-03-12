import { GLOBAL_CONTEXT } from '@/common/global-context';
import { PAGE_CONTEXT } from './context/page-context';
import MomeLayout from '@/components/layout';
import AntdThemeProvider from '@/components/antdThemeProvider';
import MicroApp from '@/components/microapp';
import './app.less';

export default function App() {
  // 初始化的全局数据
  const initGlobalValue = { test: 'test' };
  const initPageValue = { test: 'test' };
  const isDark = false;
  return (
    <GLOBAL_CONTEXT.Provider value={initGlobalValue}>
      <PAGE_CONTEXT.Provider value={initPageValue}>
        <AntdThemeProvider darkMode={isDark}>
          <MomeLayout
            onGetContent={(item) => {
              // 加载微应用
              return <MicroApp item={item} />;
            }}
          />
        </AntdThemeProvider>
      </PAGE_CONTEXT.Provider>
    </GLOBAL_CONTEXT.Provider>
  );
}
