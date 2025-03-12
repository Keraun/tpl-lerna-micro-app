import { UserOutlined } from '@ant-design/icons';
import globlEnv from '@/common/global-env';
import ROUTER_KEY from '@/router/constant';
import routerDev from '@/router/router.dev.ts';
import routerPre from '@/router/router.pre.ts';
import routerProd from '@/router/router.prod.ts';

function getItemUrl(key: string) {
  if (globlEnv.isDev) return routerDev[key];
  if (globlEnv.isTest) return routerPre[key];
  return routerProd[key];
}

// 路由配置
export const globalRouter = {
  [ROUTER_KEY.DASHBOARD_1]: {
    key: ROUTER_KEY.DASHBOARD_1,
    label: 'Dashboard-1',
    url: getItemUrl(ROUTER_KEY.DASHBOARD_1),
  },
  [ROUTER_KEY.DASHBOARD_2]: {
    key: ROUTER_KEY.DASHBOARD_2,
    label: 'Dashboard-2',
    url: getItemUrl(ROUTER_KEY.DASHBOARD_2),
  },
  [ROUTER_KEY.DASHBOARD_3]: {
    key: ROUTER_KEY.DASHBOARD_3,
    label: 'Dashboard-3',
    url: getItemUrl(ROUTER_KEY.DASHBOARD_3),
  },
  [ROUTER_KEY.DASHBOARD_4]: {
    key: ROUTER_KEY.DASHBOARD_4,
    label: 'Dashboard-4',
    url: getItemUrl(ROUTER_KEY.DASHBOARD_4),
  },
};

export interface IGlobalRouterType {
  key: string;
  label: string;
  url: string;
  [key: string]: any;
}

export interface IMenuItemType {
  key: string;
  icon: any;
  label: string;
  children?: IGlobalRouterType[];
}

// menu 配置
const menuItems: Array<IMenuItemType> = [
  {
    key: 'dashboard',
    icon: <UserOutlined />,
    label: 'Dashboard',
    children: [
      globalRouter[ROUTER_KEY.DASHBOARD_1],
      globalRouter[ROUTER_KEY.DASHBOARD_2],
    ],
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'User',
    children: [
      globalRouter[ROUTER_KEY.DASHBOARD_3],
      globalRouter[ROUTER_KEY.DASHBOARD_4],
    ],
  },
];

export default menuItems;
