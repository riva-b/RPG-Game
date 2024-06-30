import { Action, createReducer, on } from '@ngrx/store';
import { someAction } from './app.actions';

export interface AppState {
  someProperty: string;
}

const initialState: AppState = {
  someProperty: 'Initial Value',
};

const _appReducer = createReducer(
  initialState,
  on(someAction, (state, { payload }) => ({ ...state, someProperty: payload }))
);

export function appReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}
