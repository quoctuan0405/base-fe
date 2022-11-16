import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppSelector } from '../../src/redux/hooks';
import { selectNotification } from '../../src/redux/reducer/notification';

interface Props {
  children: React.ReactNode;
}

export const NotificationWrapper: React.FC<Props> = (props) => {
  return (
    <SnackbarProvider maxSnack={5}>
      <ShowNotification>{props.children}</ShowNotification>
    </SnackbarProvider>
  );
};

const ShowNotification: React.FC<Props> = (props) => {
  const notification = useAppSelector(selectNotification);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
    }
  }, [notification]);

  return <>{props.children}</>;
};
