import { ReactNode, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import Header from '@/components/header';
import Welcome from '@/components/welcome';
import { globalRouter, IGlobalRouterType } from './menuConfig';
import useLayoutHook from './useLayoutHook';
import ROUTER_KEY from '@/router/constant';
import styles from './index.module.less';

interface ILayoutProps {
  onGetContent: (item: IGlobalRouterType) => ReactNode;
}

export default function MomeLayout(props: ILayoutProps) {
  const { onGetContent } = props;

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    menuItems,
    // currentItem,
    setCurrentItem,
    breadcrumbItems,
    setBreadcrumbItems,
    getBreadcrumbItems,
  } = useLayoutHook();
  const [renderItem, setRenderItem] = useState<ReactNode>(<Welcome />);

  useEffect(() => {
    const searchQuery = window.location.search || '';
    // 设置初始化的路由信息
    const appKey = searchQuery.match(/\?([^=]+)=/)?.[1] || '';
    if (appKey && globalRouter[appKey]) {
      const defaultRouter = globalRouter[appKey];
      setRenderItem(onGetContent(defaultRouter));
    }
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider}>
        <div className={styles.logo}>后台管理</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[ROUTER_KEY.DASHBOARD_1]}
          items={menuItems}
          onClick={(e) => {
            const item = globalRouter[e.key as keyof typeof globalRouter];
            setCurrentItem?.(item);
            setRenderItem(onGetContent(item));
            setBreadcrumbItems(getBreadcrumbItems(e.keyPath));
          }}
        />
      </Sider>
      <Layout>
        <Header
          collapsed={collapsed}
          onCollapsedClick={setCollapsed}
          breadcrumbItems={breadcrumbItems?.map((item) => {
            return { title: item?.label };
          })}
        />
        <div className={styles.contentWrap}>{renderItem}</div>
      </Layout>
    </Layout>
  );
}
