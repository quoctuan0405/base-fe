import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './reducer/theme';
import { rootEpic, epicMiddleware } from './epic';
import notificationReducer, { NotificationState } from './reducer/notification';
import todoReducer, { TodoState } from './reducer/todo';
import undoable from 'redux-undo';
import { ActionTypes } from './action/type';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notification: notificationReducer,
    todo: undoable(todoReducer, {
      undoType: ActionTypes.TODO_UNDO,
      redoType: ActionTypes.TODO_REDO,
      limit: 10,
    }),
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type AppState = ReturnType<typeof store.getState>;
export type RootState = {
  notification: NotificationState;
  theme: ThemeState;
  todo: TodoState;
};
export type AppDispatch = typeof store.dispatch;
