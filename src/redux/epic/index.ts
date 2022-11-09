import { AnyAction } from '@reduxjs/toolkit';
import {
  combineEpics,
  createEpicMiddleware,
  StateObservable,
} from 'redux-observable';
import { RootState } from '../store';
import { catchError, Observable } from 'rxjs';
import { setThemeColorsEpic } from './theme';

export const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  RootState
>();

export const rootEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>,
  dependencies: any
) =>
  combineEpics<AnyAction, AnyAction, RootState>(setThemeColorsEpic)(
    action$,
    state$,
    dependencies
  ).pipe(
    catchError((error, source) => {
      return source;
    })
  );
