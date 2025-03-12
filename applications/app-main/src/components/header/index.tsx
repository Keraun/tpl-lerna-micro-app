import { Avatar, Breadcrumb, Button, Layout, Select, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { useStore } from '@/hooks/useStoreHooks';

const { Header } = Layout;

interface IHeaderProps {
  collapsed?: boolean;
  onCollapsedClick: (data: boolean) => void;
  breadcrumbItems?: Array<{ title: string }>;
}

export default function MomeHeader(props: IHeaderProps) {
  const { collapsed, onCollapsedClick, breadcrumbItems = [] } = props;
  const { setGlobalData } = useStore();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      className={styles.wrap}
      style={{
        background: colorBgContainer,
      }}
    >
      <div className={styles.left}>
        <Button
          className={styles.collapseBtn}
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapsedClick(!collapsed)}
        />
        <Breadcrumb className={styles.breadcrumbWrap} items={breadcrumbItems} />
      </div>
      <div className={styles.right}>
        <Select
          options={[
            { label: '管理员', value: '管理员' },
            { label: '用户', value: '用户' },
          ]}
          className={styles.select}
          onChange={(value) => {
            setGlobalData({ userName: value });
          }}
        />
        <Avatar size={40}>USER</Avatar>
      </div>
    </Header>
  );
}
