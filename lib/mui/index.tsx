import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from './createEmotionCache';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../../src/redux/hooks';
import { selectThemeOption } from '../../src/redux/reducer/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

export const MUIWrapper: React.FC<Props> = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;
  const themeOption = useAppSelector(selectThemeOption);

  const theme = React.useMemo<Theme>(
    () => createTheme(themeOption),
    [themeOption]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  );
};
