import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssignmentDataFilters } from '../models/assignment-data-filters.model';
import {
  AssignmentDataFiltersActions,
  AssignmentDataFiltersActionTypes,
  RemovingAssignmentDataFilters
} from '../actions/assignment-data-filters.actions';

export interface State extends EntityState<AssignmentDataFilters> {
  // additional entities state properties
  selectedOrgunits: any;
  orgunitTodisplay: any;
  selectedData: any;
}

export const adapter: EntityAdapter<AssignmentDataFilters> = createEntityAdapter<AssignmentDataFilters>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedOrgunits: [],
  orgunitTodisplay: [],
  selectedData: []
});

export function reducer(
  state = initialState,
  action: AssignmentDataFiltersActions
): State {
  switch (action.type) {
    case AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersOrgunits: {
      return {...state,
        selectedOrgunits: action.payload,
        orgunitTodisplay: (action.payload.length > 1) ? action.payload : action.payload[0].children
      };
    }

    case AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersData: {
      return {...state, selectedData: action.payload};
    }

    case AssignmentDataFiltersActionTypes.UpsertAssignmentDataFilters: {
      return adapter.addMany(action.payload, state);
    }

    case AssignmentDataFiltersActionTypes.UpsertAssignmentDataFilterss: {
      return adapter.upsertMany(action.payload.assignmentDataFilterss, state);
    }

    case AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilters: {
      const stateEntities = {...state.entities};
      stateEntities[action.payload.assignmentObject.id] = action.payload.assignmentObject;
      return {...state,
        entities : stateEntities,
        selectedData: action.payload.selectedData};
    }

    case AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilterss: {
      return adapter.updateMany(action.payload.assignmentDataFilterss, state);
    }

    case AssignmentDataFiltersActionTypes.DeleteAssignmentDataFilters: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AssignmentDataFiltersActionTypes.AddingAssignmentDataFilters: {
      return state;
    }

    case AssignmentDataFiltersActionTypes.LoadAssignmentDataFilterss: {
      return adapter.addAll(action.payload.assignmentDataFilterss, state);
    }

    case AssignmentDataFiltersActionTypes.RemovingAssignmentDataFilters: {
      const stateEntities = {...state.entities};
      stateEntities[action.payload.assignmentObject.id] = action.payload.assignmentObject;
      return {...state,
        entities : stateEntities,
        selectedData: action.payload.selectedData};
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getAssignmentEntitiesState = (state: State) => state.entities;
export const getselectedOrgunitsState = (state: State) => state.orgunitTodisplay;
export const getselectedDataState = (state: State) => state.selectedData;
