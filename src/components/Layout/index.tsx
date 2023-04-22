import Head from 'next/head';
import { Provider } from 'react-redux';

import store from '@/store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Тестовое задание 4DEV</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Тестовое задание 4DEV" />
      </Head>
      {children}
    </Provider>
  );
};

export default Layout;
