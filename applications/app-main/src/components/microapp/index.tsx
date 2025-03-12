/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';
import Content from '@/components/content';
import { globalRouter, IGlobalRouterType } from '@/components/layout/menuConfig';

interface IMicroAppProps {
  item: IGlobalRouterType;
}

export default function MicroApp(props: IMicroAppProps) {
  const { item } = props;

  return (
    <Content>
      <micro-app
        name={item.key}
        url={globalRouter?.[item?.key]?.url}
        // data={data}
        // onDataChange={onDataChange}
        iframe
        onCreated={() => console.log('micro-app元素被创建')}
        onBeforemount={() => console.log('即将渲染')}
        onMounted={() => console.log('已经渲染完成')}
        onUnmount={() => console.log('已经卸载')}
        onError={() => console.log('加载出错')}
      ></micro-app>
    </Content>
  );
}
