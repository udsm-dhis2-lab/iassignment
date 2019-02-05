import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssignmentDataFilters } from '../models/assignment-data-filters.model';
import {
  AssignmentDataFiltersActions,
  AssignmentDataFiltersActionTypes, AssignmentNotification,
  RemovingAssignmentDataFilters, UploadOfflineAssignmentDataFilters
} from '../actions/assignment-data-filters.actions';

export interface State extends EntityState<AssignmentDataFilters> {
  // additional entities state properties
  selectedOrgunits: any;
  orgunitTodisplay: any;
  selectedData: any;
  notificationStatus: string;
}

export const adapter: EntityAdapter<AssignmentDataFilters> = createEntityAdapter<AssignmentDataFilters>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedOrgunits: [],
  orgunitTodisplay: [],
  selectedData: [],
  notificationStatus: ''
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

    case AssignmentDataFiltersActionTypes.AssignAllData: {
      return state;
    }

    case AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilters: {
      const stateEntities = {...state.entities};
      stateEntities[action.payload.assignmentObject.id] = action.payload.assignmentObject;
      return {...state,
        entities : stateEntities,
        notificationStatus: action.payload.notificationStatus,
        selectedData: action.payload.selectedData,
        selectedOrgunits: action.payload.selectedOrgunits,
        orgunitTodisplay: action.payload.orgunitTodisplay,
      };
    }

    case AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilterss: {
      return adapter.upsertMany(action.payload.assignmentArray, {...state, notificationStatus: action.payload.notificationStatus});
    }

    case AssignmentDataFiltersActionTypes.RemoveAssignAllData: {
      return state;
    }

    case AssignmentDataFiltersActionTypes.AddingAssignmentDataFilters: {
      return state;
    }

    case AssignmentDataFiltersActionTypes.UploadOfflineAssignmentDataFilters: {
      return state;
    }

    case AssignmentDataFiltersActionTypes.LoadAssignmentDataFilterss: {
      return adapter.addAll(action.payload.assignmentDataFilterss, state);
    }

    case AssignmentDataFiltersActionTypes.RemovingAssignmentDataFilters: {
      return state;
    }

    case AssignmentDataFiltersActionTypes.AssignmentNotification: {
      return {...state, notificationStatus: action.payload};
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
export const getAssingmentNotificationState = (state: State) => state.notificationStatus;
