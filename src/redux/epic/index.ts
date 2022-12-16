import { AnyAction } from '@reduxjs/toolkit';
import {
  combineEpics,
  createEpicMiddleware,
  StateObservable,
} from 'redux-observable';
import { catchError, Observable } from 'rxjs';
import { setThemeColorsEpic } from './theme';

export const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any>();

export const rootEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<any>,
  dependencies: any
) =>
  combineEpics<AnyAction, AnyAction, any>(setThemeColorsEpic)(
    action$,
    state$,
    dependencies
  ).pipe(
    catchError((error, source) => {
      return source;
    })
  );
