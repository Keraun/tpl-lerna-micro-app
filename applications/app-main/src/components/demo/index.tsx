import { useEffect } from 'react';
import classNames from 'classnames';
import useDemoHook from './useDemoHook';
import styles from './index.module.less';

interface IDemoProps {
  test?: number | string;
}

export default function Demo(props: IDemoProps) {
  const { test } = props;

  const { testDemoData } = useDemoHook({ initDemoData: 2 });

  useEffect(() => {});

  return (
    <div className={classNames(styles.wrap, styles.test)}>
      <div>Demo</div>
      <div>useDemoHook testDemoData: {testDemoData.current}</div>
      <div>{test}</div>
    </div>
  );
}
