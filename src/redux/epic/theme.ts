import { Action } from '@reduxjs/toolkit';
import { filter, debounceTime, switchMap } from 'rxjs';
import { Epic } from 'redux-observable';
import { RootState } from '../store';
import { setThemeColorsWithThrottle, setThemeColors } from '../reducer/theme';

export const setThemeColorsEpic: Epic<Action, Action, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(setThemeColorsWithThrottle.match),
    debounceTime(60),
    switchMap(async (action) => setThemeColors(action.payload))
  );
