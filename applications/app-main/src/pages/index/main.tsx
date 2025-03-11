import '@/common/global-init';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/common/global-style.less';
import App from './app';

import microApp from '@micro-zoe/micro-app';
microApp.start();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
