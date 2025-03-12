declare namespace JSX {
  interface IntrinsicElements {
    'micro-app': {
      name?: any;
      url?: any;
      iframe?: any;
      data?: any;
      key?: any;
      onDataChange?: any;
      onCreated?: any;
      onBeforemount?: any;
      onMounted?: any;
      onUnmount?: any;
      onError?: any;
    };
  }
}

interface Window {
  microApp: MicroApp;
}
