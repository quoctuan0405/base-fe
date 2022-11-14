import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../src/redux/reducer/theme';

interface Props {
  children: React.ReactNode;
}

export const HotkeyWrapper: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useHotkeys('shift + t', () => {
    dispatch(toggleDarkMode());
  });

  return <>{props.children}</>;
};
