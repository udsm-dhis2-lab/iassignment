import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AssignmentDataFilters } from '../models/assignment-data-filters.model';

export enum AssignmentDataFiltersActionTypes {
  LoadAssignmentDataFilterss = '[AssignmentDataFilters] Load AssignmentDataFilterss',
  AddAssignmentDataFiltersOrgunits = '[AssignmentDataFilters] Add AssignmentDataFilters orgunits',
  TriggerAssignmentDataFiltersOrgunits = '[AssignmentDataFilters] Trigger AssignmentDataFilters orgunits',
  UpsertAssignmentDataFilters = '[AssignmentDataFilters] Upsert AssignmentDataFilters',
  AddAssignmentDataFiltersData = '[AssignmentDataFilters] Add AssignmentDataFilters Data',
  AssignAllData = '[AssignmentDataFilters] Assign All Data',
  UpdateAssignmentDataFilters = '[AssignmentDataFilters] Update AssignmentDataFilters',
  UpdateAssignmentDataFilterss = '[AssignmentDataFilters] Update AssignmentDataFilterss',
  RemoveAssignAllData = '[AssignmentDataFilters] Remove All Data',
  AddingAssignmentDataFilters = '[AssignmentDataFilters] Adding AssignmentDataFilters',
  RemovingAssignmentDataFilters = '[AssignmentDataFilters] Removing AssignmentDataFilters',
  UploadOfflineAssignmentDataFilters = '[AssignmentDataFilters] Uploading Offline Assignment Data',
  AssignmentNotification = '[AssignmentDataFilters] Assignment Notification'
}

export class LoadAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.LoadAssignmentDataFilterss;

  constructor(public payload: { assignmentDataFilterss: AssignmentDataFilters[] }) {}
}

export class TriggerAssignmentDataFiltersOrgunits implements Action {
  readonly type = AssignmentDataFiltersActionTypes.TriggerAssignmentDataFiltersOrgunits;

  constructor(public payload: any) {}
}

export class AddAssignmentDataFiltersOrgunits implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersOrgunits;

  constructor(public payload: any) {}
}

export class UploadOfflineAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UploadOfflineAssignmentDataFilters;

  // constructor(public payload: any) {}
}

export class UpsertAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpsertAssignmentDataFilters;

  constructor(public payload: any) {}
}

export class AddAssignmentDataFiltersData implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersData;

  constructor(public payload: any) {}
}

export class AssignAllData implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AssignAllData;

  constructor(public payload: any) {}
}

export class UpdateAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilters;

  constructor(public payload: any) {}
}

export class UpdateAssignmentDataFilterss implements Action {
  readonly type = AssignmentDataFiltersActionTypes.UpdateAssignmentDataFilterss;

  constructor(public payload: any) {}
}

export class RemoveAssignAllData implements Action {
  readonly type = AssignmentDataFiltersActionTypes.RemoveAssignAllData;

  constructor(public payload: any) {}
}

export class AddingAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AddingAssignmentDataFilters;

  constructor(public payload: any) {}
}

export class RemovingAssignmentDataFilters implements Action {
  readonly type = AssignmentDataFiltersActionTypes.RemovingAssignmentDataFilters;

  constructor(public payload: any) {}
}

export class AssignmentNotification implements Action {
  readonly type = AssignmentDataFiltersActionTypes.AssignmentNotification;

  constructor(public payload: any) {}
}

export type AssignmentDataFiltersActions =
 LoadAssignmentDataFilterss
 | AddAssignmentDataFiltersOrgunits
 | TriggerAssignmentDataFiltersOrgunits
 | UpsertAssignmentDataFilters
 | UploadOfflineAssignmentDataFilters
 | AddAssignmentDataFiltersData
 | AssignAllData
 | UpdateAssignmentDataFilters
 | UpdateAssignmentDataFilterss
 | RemoveAssignAllData
 | AddingAssignmentDataFilters
 | RemovingAssignmentDataFilters
 | AssignmentNotification;
