import {createSelector} from '@ngrx/store';
import * as fromMainReducer from '../reducers';
import * as fromAssignmentReducer from '../reducers/assignments-page.reducer';

export const getAssignmentPageState = createSelector(
  fromMainReducer.getAssignmentPage,
  fromAssignmentReducer.getAssignmentState
);

export const getAssignmentPageEntities = createSelector(
  fromMainReducer.getAssignmentPage,
  fromAssignmentReducer.assignmentPageEntities
);

export const getAssignmentLoadingState = createSelector(
  fromMainReducer.getAssignmentPage,
  fromAssignmentReducer.getAssignmentLoading
);

export const getAssignmentLoadedState = createSelector(
  fromMainReducer.getAssignmentPage,
  fromAssignmentReducer.getAssignmentLoaded
);
