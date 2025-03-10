import { Fragment } from 'react';

interface ILayoutProps {
  children?: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return <Fragment>{props.children}</Fragment>;
}
