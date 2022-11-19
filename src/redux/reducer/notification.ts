import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VariantType } from 'notistack';
import { AppState, RootState } from '../store';

export interface Notification {
  message: string;
  variant: VariantType;
}

export interface NotificationState {
  notification: Notification | null;
}

const initialState: NotificationState = {
  notification: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<Notification>) {
      state.notification = action.payload;
    },
  },
});

export const selectNotification = (state: AppState) =>
  state.notification.notification;

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
