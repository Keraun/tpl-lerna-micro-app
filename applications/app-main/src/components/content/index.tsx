import classnames from 'classnames';
import { theme } from 'antd';
import styles from './index.module.less';

interface IContentProps {
  className?: string;
  useWrap?: boolean;
  children?: any;
}

export default function Content(props: IContentProps) {
  const { className = '', useWrap = true, children } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (useWrap) {
    return (
      <div
        className={classnames('main-cotent', styles.wrap, className)}
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    );
  }

  return <div className={classnames('main-cotent', className)}>{children}</div>;
}
