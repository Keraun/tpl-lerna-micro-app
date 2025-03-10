import { GLOBAL_CONTEXT } from '@/common/global-context';
import { PAGE_CONTEXT } from './context/page-context';

import Demo from '@/components/demo';

import './app.less';

export default function App() {
  // 初始化的全局数据
  const initGlobalValue = { test: 'test' };
  const initPageValue = { test: 'test' };

  return (
    <GLOBAL_CONTEXT.Provider value={initGlobalValue}>
      <PAGE_CONTEXT.Provider value={initPageValue}>
        <Demo test={'demo page'} />
      </PAGE_CONTEXT.Provider>
    </GLOBAL_CONTEXT.Provider>
  );
}
