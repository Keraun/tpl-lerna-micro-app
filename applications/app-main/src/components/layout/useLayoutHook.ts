import { useState } from 'react';
import menuConfig, { IMenuItemType } from './menuConfig';
import { IGlobalRouterType } from './menuConfig';

interface IUseLayoutHookProps {
  test?: string;
}

export default function useLayoutHook(props?: IUseLayoutHookProps) {
  const [currentItem, setCurrentItem] = useState<IGlobalRouterType>();
  const [breadcrumbItems, setBreadcrumbItems] = useState<IMenuItemType[]>();

  const getBreadcrumbItems = (keyPaths: string[]): IMenuItemType[] => {
    const keyList = keyPaths.reverse();

    const list: IMenuItemType[] = [];
    const rootKey = keyList[0];

    const rootItem = menuConfig.filter((item) => item.key === rootKey)[0] as IMenuItemType;
    list.push(rootItem);

    const childKey = keyList[1];

    if (childKey) {
      const childItem = rootItem?.children?.filter(
        (item) => item.key === childKey
      )[0] as unknown as IMenuItemType;
      list.push(childItem);
    }
    return list;
  };

  return {
    currentItem,
    setCurrentItem,
    menuItems: menuConfig,
    breadcrumbItems,
    setBreadcrumbItems,
    getBreadcrumbItems,
  };
}
