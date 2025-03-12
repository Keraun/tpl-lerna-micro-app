import { useEffect } from 'react';

import microApp from '@micro-zoe/micro-app';
import { useState } from 'react';

export const useStore = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    function dataListener(data: any) {
      console.log('全局数据', data);
      setData(data);
    }
    console.log('window.microApp', window.microApp);
    microApp.addGlobalDataListener(dataListener, true);
  }, []);

  const setGlobalData = (data: any) => {
    microApp.setGlobalData(data);
  };

  const getGlobalData = () => {
    return microApp.getGlobalData();
  };

  return {
    data,
    setGlobalData,
    getGlobalData,
  };
};
