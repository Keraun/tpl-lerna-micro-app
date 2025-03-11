import { GLOBAL_CONTEXT } from '@/common/global-context';
import { PAGE_CONTEXT } from './context/page-context';
import { useCallback, useState } from 'react';
import Demo from '@/components/demo';

import './app.less';

export default function App() {
  // 初始化的全局数据
  const initGlobalValue = { test: 'test' };
  const initPageValue = { test: 'test' };
  const [microApp, setMicroApp] = useState<any>(null);

  const onSwitchTab = useCallback((data: string) => {
    return () => {
      setMicroApp(data);
    };
  }, []);

  return (
    <GLOBAL_CONTEXT.Provider value={initGlobalValue}>
      <PAGE_CONTEXT.Provider value={initPageValue}>
        <Demo />

        <div onClick={onSwitchTab('1')}>切换1</div>
        <div onClick={onSwitchTab('2')}>切换2</div>

        {microApp == '1' ? (
          <micro-app name='my-app' url='http://localhost:5004/' iframe></micro-app>
        ) : null}
        {microApp == '2' ? (
          <micro-app
            name='my-app-2'
            url='http://localhost:5005/demo.html'
            iframe
          ></micro-app>
        ) : null}
      </PAGE_CONTEXT.Provider>
    </GLOBAL_CONTEXT.Provider>
  );
}
