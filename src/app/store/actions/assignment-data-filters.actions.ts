import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AssignmentDataFilters } from '../models/assignment-data-filters.model';

export enum AssignmentDataFiltersActionTypes {
  LoadAssignmentDataFilterss = '[AssignmentDataFilters] Load AssignmentDataFilterss',
  AddAssignmentDataFiltersOrgunits = '[AssignmentDataFilters] Add AssignmentDataFilters orgunits',
  UpsertAssignmentDataFilters = '[AssignmentDataFilters] Upsert AssignmentDataFilters',
  AddAssignmentDataFiltersData = '[AssignmentDataFilters] Add AssignmentDataFilters Data',
  UpsertAssignmentDataFilterss = '[AssignmentDataFilters] Upsert AssignmentDataFilterss',
  UpdateAssignmentDataFilters = '[AssignmentDataFilters] Update AssignmentDataFilters',
  UpdateAssignmentDataFilterss = '[AssignmentDataFilters] Update AssignmentDataFilterss',
  DeleteAssignmentDataFilters = '[AssignmentDataFilters] Delete AssignmentDataFilters',
  DeleteAssignmentDataFilterss = '[AssignmentDataFilters] Delete AssignmentDataFilterss',
  ClearAssignmentDataFilterss = '[AssignmentDataFilters] Clear AssignmentDataFilterss'
}

export class LoadAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.LoadAssignmentDataFilterss;

  constructor(public payload: { assignmentDataFilterss: AssignmentDataFilters[] }) {}
}

export class AddAssignmentDataFiltersOrgunits implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersOrgunits;

  constructor(public payload: any) {}
}

export class UpsertAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpsertAssignmentDataFilters;

  constructor(public payload: any) {}
}

export class AddAssignmentDataFiltersData implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersData;

  constructor(public payload: any) {}
}

export class UpsertAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpsertAssignmentDataFilterss;

  constructor(public payload: { assignmentDataFilterss: AssignmentDataFilters[] }) {}
}

export class UpdateAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilters;

  constructor(public payload: { assignmentDataFilters: Update<AssignmentDataFilters> }) {}
}

export class UpdateAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilterss;

  constructor(public payload: { assignmentDataFilterss: Update<AssignmentDataFilters>[] }) {}
}

export class DeleteAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.DeleteAssignmentDataFilters;

  constructor(public payload: { id: string }) {}
}

export class DeleteAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.DeleteAssignmentDataFilterss;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.ClearAssignmentDataFilterss;
}

export type AssignmentDataFiltersActions =
 LoadAssignmentDataFilterss
 | AddAssignmentDataFiltersOrgunits
 | UpsertAssignmentDataFilters
 | AddAssignmentDataFiltersData
 | UpsertAssignmentDataFilterss
 | UpdateAssignmentDataFilters
 | UpdateAssignmentDataFilterss
 | DeleteAssignmentDataFilters
 | DeleteAssignmentDataFilterss
 | ClearAssignmentDataFilterss;
