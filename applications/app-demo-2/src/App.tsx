import { BrowserRouter, Routes, Route, Link } from 'react-router';

import { GLOBAL_CONTEXT } from './context';
import Layout from './layout';
import Home from '@/pages/home';
import About from '@/pages/about';
import NotFound from '@/pages/notFound';

import './global.less';

export default function App() {
  // 初始化的全局数据
  const initValue = { test: 'test' };

  return (
    <GLOBAL_CONTEXT.Provider value={initValue}>
      <BrowserRouter>
        <Layout>
          {/* 导航菜单 */}
          <nav>
            <Link to='/'>Home</Link> |<Link to='/about'>About</Link>
          </nav>
          {/* 路由配置 */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GLOBAL_CONTEXT.Provider>
  );
}
