import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useDemoHook from './useDemoHook';
import styles from './index.module.less';
import { useStore } from '@/hooks/useStore';
import { Button, Input } from 'antd';

interface IDemoProps {
  test?: number | string;
  page?: string;
}

export default function Demo(props: IDemoProps) {
  const { page = 'global' } = props;
  const { data, setData, getData } = useStore();
  const [inputValue, setInputValue] = useState('输入数据');
  const { test } = props;

  const { testDemoData } = useDemoHook({ initDemoData: 2 });

  useEffect(() => {});

  return (
    <div className={classNames(styles.wrap, styles.test)}>
      <div>Demo</div>
      <div>useDemoHook testDemoData: {testDemoData.current}</div>
      <div>{test}</div>
      <div>{JSON.stringify(data)}</div>
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={() => setData({ [page]: inputValue })}>发送数据</Button>
      <Button
        onClick={() => {
          const data = getData();
          console.log('获取数据', data);
        }}
      >
        获取数据
      </Button>
    </div>
  );
}
