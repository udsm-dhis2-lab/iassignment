import {createSelector} from '@ngrx/store';
import * as fromMainReducer from '../reducers';
import * as fromAssignmentDataFilters from '../reducers/assignment-data-filters.reducer';

export const getAssingmentDataFilterSelectedData = createSelector(
  fromMainReducer.getAssignmentDataFilter,
  fromAssignmentDataFilters.getselectedDataState
);

export const getAssingmentDataFilterSelectedOrgunit = createSelector(
  fromMainReducer.getAssignmentDataFilter,
  fromAssignmentDataFilters.getselectedOrgunitsState,
  // (selectedOrgunits) => {
  //   if (selectedOrgunits.length > 1) {
  //     return selectedOrgunits;
  //   } else {
  //    return selectedOrgunits[0].children;
  //   }
  // }
);

export const getAssingmentDataFilterEntities = createSelector(
  fromMainReducer.getAssignmentDataFilter,
  fromAssignmentDataFilters.getAssignmentEntitiesState
);
