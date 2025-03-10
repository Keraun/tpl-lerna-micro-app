import { useRef } from 'react';

interface IUseHomeHookProps {
  initTestData?: string | number;
}

export default function useHomeHook(props: IUseHomeHookProps) {
  const testData = useRef(props.initTestData);
  return {
    testData,
  };
}
