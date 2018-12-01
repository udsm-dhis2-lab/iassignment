import {createSelector} from '@ngrx/store';
import * as fromMainReducer from '../reducers';
import * as fromAssignmentDataFilters from '../reducers/assignment-data-filters.reducer';

export const getAssingmentDataFilterSelectedData = createSelector(
  fromMainReducer.getAssignmentDataFilter,
  fromAssignmentDataFilters.getselectedDataState
);

export const getAssingmentDataFilterSelectedOrgunit = createSelector(
  fromMainReducer.getAssignmentDataFilter,
  fromAssignmentDataFilters.getselectedOrgunitsState
);

export const getAssingmentDataFilterEntities = createSelector(
  fromMainReducer.getAssignmentDataFilter,
  fromAssignmentDataFilters.getAssignmentEntitiesState
);
