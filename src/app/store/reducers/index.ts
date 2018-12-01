import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromAssignmentsPage from './assignments-page.reducer';
import * as fromAssignmentDataFilters from './assignment-data-filters.reducer';

export interface AppState {

  assignmentsPage: fromAssignmentsPage.State;
  assignmentDataFilters: fromAssignmentDataFilters.State;
}

export const reducers: ActionReducerMap<AppState> = {
  assignmentsPage: fromAssignmentsPage.reducer,
  assignmentDataFilters: fromAssignmentDataFilters.reducer,
};

export const getAssignmentPage = (state: AppState) => state.assignmentsPage;
export const getAssignmentDataFilter = (state: AppState) => state.assignmentDataFilters


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
