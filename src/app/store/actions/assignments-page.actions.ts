import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AssignmentsPage } from '../models/assignments-page.model';

export enum AssignmentsPageActionTypes {
  LoadAssignmentsPages = '[AssignmentsPage] Load AssignmentsPages',
  AddAssignmentsPage = '[AssignmentsPage] Add AssignmentsPage',
  UpsertAssignmentsPage = '[AssignmentsPage] Upsert AssignmentsPage',
  AddAssignmentsPages = '[AssignmentsPage] Add AssignmentsPages',
  UpsertAssignmentsPages = '[AssignmentsPage] Upsert AssignmentsPages',
  UpdateAssignmentsPage = '[AssignmentsPage] Update AssignmentsPage',
  UpdateAssignmentsPages = '[AssignmentsPage] Update AssignmentsPages',
  DeleteAssignmentsPage = '[AssignmentsPage] Delete AssignmentsPage',
  DeleteAssignmentsPages = '[AssignmentsPage] Delete AssignmentsPages',
  ClearAssignmentsPages = '[AssignmentsPage] Clear AssignmentsPages'
}

export class LoadAssignmentsPages implements Action {
  readonly type = AssignmentsPageActionTypes.LoadAssignmentsPages;

  // constructor(public payload: { assignmentsPages: AssignmentsPage[] }) {}
}

export class AddAssignmentsPage implements Action {
  readonly type = AssignmentsPageActionTypes.AddAssignmentsPage;

  constructor(public payload: { assignmentsPage: AssignmentsPage }) {}
}

export class UpsertAssignmentsPage implements Action {
  readonly type = AssignmentsPageActionTypes.UpsertAssignmentsPage;

  constructor(public payload: { assignmentsPage: AssignmentsPage }) {}
}

export class AddAssignmentsPages implements Action {
  readonly type = AssignmentsPageActionTypes.AddAssignmentsPages;

  constructor(public payload: any) {}
}

export class UpsertAssignmentsPages implements Action {
  readonly type = AssignmentsPageActionTypes.UpsertAssignmentsPages;

  constructor(public payload: { assignmentsPages: AssignmentsPage[] }) {}
}

export class UpdateAssignmentsPage implements Action {
  readonly type = AssignmentsPageActionTypes.UpdateAssignmentsPage;

  constructor(public payload: { assignmentsPage: Update<AssignmentsPage> }) {}
}

export class UpdateAssignmentsPages implements Action {
  readonly type = AssignmentsPageActionTypes.UpdateAssignmentsPages;

  constructor(public payload: { assignmentsPages: Update<AssignmentsPage>[] }) {}
}

export class DeleteAssignmentsPage implements Action {
  readonly type = AssignmentsPageActionTypes.DeleteAssignmentsPage;

  constructor(public payload: { id: string }) {}
}

export class DeleteAssignmentsPages implements Action {
  readonly type = AssignmentsPageActionTypes.DeleteAssignmentsPages;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAssignmentsPages implements Action {
  readonly type = AssignmentsPageActionTypes.ClearAssignmentsPages;
}

export type AssignmentsPageActions =
 LoadAssignmentsPages
 | AddAssignmentsPage
 | UpsertAssignmentsPage
 | AddAssignmentsPages
 | UpsertAssignmentsPages
 | UpdateAssignmentsPage
 | UpdateAssignmentsPages
 | DeleteAssignmentsPage
 | DeleteAssignmentsPages
 | ClearAssignmentsPages;
