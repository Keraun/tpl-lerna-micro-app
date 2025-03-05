import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GLOBAL_CONTEXT } from './context';
import Layout from './layout';
import Home from '@/pages/home';
import './index.less';

export default function App() {
  // 初始化的全局数据
  const initValue = { test: 'test' };

  return (
    <GLOBAL_CONTEXT.Provider value={initValue}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test1' element={<div>test page1</div>} />
            <Route path='/test2' element={<div>test1 page 2</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GLOBAL_CONTEXT.Provider>
  );
}
