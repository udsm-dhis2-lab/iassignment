import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssignmentsPage } from '../models/assignments-page.model';
import { AssignmentsPageActions, AssignmentsPageActionTypes } from '../actions/assignments-page.actions';

export interface State extends EntityState<AssignmentsPage> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<AssignmentsPage> = createEntityAdapter<AssignmentsPage>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: true,
  loaded: false,
});

export function reducer(
  state = initialState,
  action: AssignmentsPageActions
): State {
  switch (action.type) {
    case AssignmentsPageActionTypes.AddAssignmentsPage: {
      return adapter.addOne(action.payload.assignmentsPage, state);
    }

    case AssignmentsPageActionTypes.UpsertAssignmentsPage: {
      return adapter.upsertOne(action.payload.assignmentsPage, state);
    }

    case AssignmentsPageActionTypes.AddAssignmentsPages: {
      return adapter.addMany(action.payload, {...state, loaded: true, loading: false});
    }

    case AssignmentsPageActionTypes.UpsertAssignmentsPages: {
      return adapter.upsertMany(action.payload.assignmentsPages, state);
    }

    case AssignmentsPageActionTypes.UpdateAssignmentsPage: {
      return adapter.updateOne(action.payload.assignmentsPage, state);
    }

    case AssignmentsPageActionTypes.UpdateAssignmentsPages: {
      return adapter.updateMany(action.payload.assignmentsPages, state);
    }

    case AssignmentsPageActionTypes.DeleteAssignmentsPage: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AssignmentsPageActionTypes.DeleteAssignmentsPages: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AssignmentsPageActionTypes.LoadAssignmentsPages: {
      return state;
    }

    case AssignmentsPageActionTypes.ClearAssignmentsPages: {
      return adapter.removeAll(state);
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

export const assignmentPageEntities = (state: State) => state.entities;
export const getAssignmentLoading = (state: State) => state.loading;
export const getAssignmentLoaded = (state: State) => state.loaded;
export const getAssignmentState = (state: State) => state;
