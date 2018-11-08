import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromAssignmentsPage from './assignments-page.reducer';

export interface AppState {

  assignmentsPage: fromAssignmentsPage.State;
}

export const reducers: ActionReducerMap<AppState> = {

  assignmentsPage: fromAssignmentsPage.reducer,
};

export const getAssignmentPage = (state: AppState) => state.assignmentsPage;


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
