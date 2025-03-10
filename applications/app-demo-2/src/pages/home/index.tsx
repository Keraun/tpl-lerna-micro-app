import { useContext, useEffect } from 'react';
import { GLOBAL_CONTEXT } from '@/context';
import DemoComponent from '@/components/demo';
import useHomeHook from './useHomeHook';
import './index.less';
import styles from './index.module.less';

export default function Home() {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const { testData } = useHomeHook({ initTestData: 1 });

  useEffect(() => {}, []);

  console.log('globalContext', globalContext);
  console.log('useHomeHook testData', testData.current);

  return (
    <div className={styles.wrap}>
      <div className='text-3xl font-bold text-blue-500'>Home</div>
      <div>globalContext: {JSON.stringify(globalContext)}</div>
      <div>useHomeHook testData: {testData.current}</div>
      <div>
        <DemoComponent />
      </div>
    </div>
  );
}
