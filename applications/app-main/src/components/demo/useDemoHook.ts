import { useRef } from 'react';

interface IUseDemoHookProps {
  initDemoData?: string | number;
}

export default function useDemoHook(props: IUseDemoHookProps) {
  const testDemoData = useRef(props.initDemoData);
  return {
    testDemoData,
  };
}
