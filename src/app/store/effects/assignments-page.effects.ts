import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import * as fromAssignmentPageActions from "../actions/assignments-page.actions";
import {
  AddAssignmentsPages,
  AssignmentsPageActionTypes,
} from "../actions/assignments-page.actions";
import { assignmentPageConfig } from "../models/configurations/assignement-page-config";
import { AppState } from "../reducers";

@Injectable()
export class AssignmentsPageEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  loadgAssignmentPages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentsPageActionTypes.LoadAssignmentsPages),
      map((action: fromAssignmentPageActions.LoadAssignmentsPages) => {
        let assignmentPageConfigurations = [];
        assignmentPageConfigurations = assignmentPageConfig
          ? assignmentPageConfig
          : [];
        return new AddAssignmentsPages(assignmentPageConfigurations);
      })
    )
  );
}
