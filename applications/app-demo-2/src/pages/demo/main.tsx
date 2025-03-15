import '@/common/global-init';
import { createRoot } from 'react-dom/client';
import '@/common/global-style.less';
import App from './app';

createRoot(document.getElementById('root')!).render(<App />);
