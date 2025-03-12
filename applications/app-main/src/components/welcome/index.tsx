import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export default function WelCome() {
  useEffect(() => {});

  return (
    <div className={classNames(styles.wrap)}>
      <div>welcome admin</div>
    </div>
  );
}
