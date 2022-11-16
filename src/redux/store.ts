import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './reducer/theme';
import { rootEpic, epicMiddleware } from './epic';
import notificationReducer, { NotificationState } from './reducer/notification';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notification: notificationReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type AppState = ReturnType<typeof store.getState>;
export type RootState = {
  notification: NotificationState;
  theme: ThemeState;
};
export type AppDispatch = typeof store.dispatch;
