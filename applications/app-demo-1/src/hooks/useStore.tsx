import { useEffect, useState, useCallback } from 'react';

// 声明 window.microApp 类型
declare global {
  interface Window {
    microApp: {
      getData: () => any;
      addDataListener: (listener: (data: any) => void) => void;
      dispatch: (data: any) => void;
      getGlobalData: () => any;
      addGlobalDataListener: (listener: (data: any) => void) => void;
      setGlobalData: (data: any) => void;
    };
  }
}

// 初始化主应用的配置
function initMicroApp() {
  if (window.microApp) {
    return window.microApp;
  }
  const microApp = {
    getData: () => {},
    addDataListener: () => {},
    dispatch: () => {},
    getGlobalData: () => {},
    addGlobalDataListener: () => {},
    setGlobalData: () => {},
  };
  window.microApp = microApp;
}

initMicroApp();

// 获取父亲应用数据
function getGlobalDataFromParent() {
  return window.microApp?.getGlobalData() || {};
}

export const useStore = () => {
  const [store, setStore] = useState<any>({});

  useEffect(() => {
    const data = getGlobalDataFromParent();
    setStore(data);

    function dataListener(data: any) {
      setStore(data);
    }

    window.microApp.addGlobalDataListener(dataListener);

    return () => {
      // 清理订阅
    };
  }, []);

  const getData = useCallback(() => {
    return getGlobalDataFromParent();
  }, []);

  const dispatchData = useCallback((data: any) => {
    window.microApp.setGlobalData(data);
  }, []);

  return {
    data: store,
    setData: dispatchData,
    getData,
  };
};
