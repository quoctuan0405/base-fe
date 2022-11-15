import * as React from 'react';
import { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { MUIWrapper } from '../lib/mui';
import { appWithTranslation } from 'next-i18next';
import { HotkeyWrapper } from '../lib/hotkey';
import { useHotkeys } from 'react-hotkeys-hook';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

export interface StaticProps {
  locale: string;
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <MUIWrapper {...props}>
        <SnackbarProvider maxSnack={5}>
          <HotkeyWrapper>
            <Component {...pageProps} />
          </HotkeyWrapper>
        </SnackbarProvider>
      </MUIWrapper>
    </Provider>
  );
};

export default appWithTranslation(MyApp);
