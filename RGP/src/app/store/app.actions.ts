import { createAction, props } from '@ngrx/store';

export const someAction = createAction(
  '[App] Some Action',
  props<{ payload: string }>()
);
