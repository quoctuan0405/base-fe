import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './reducer/theme';
import { rootEpic, epicMiddleware } from './epic';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type AppState = ReturnType<typeof store.getState>;
export type RootState = {
  theme: ThemeState;
};
export type AppDispatch = typeof store.dispatch;
