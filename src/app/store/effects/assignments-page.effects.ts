import {Injectable} from '@angular/core';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as fromAssignmentPageActions from '../actions/assignments-page.actions';
import {AssignmentsPageActionTypes, AddAssignmentsPages} from '../actions/assignments-page.actions';
import {assignmentPageConfig} from '../models/configurations/assignement-page-config';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AssignmentsPageEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions) {}

    @Effect()
  loadgAssignmentPages$ = this.actions$.pipe(
    ofType(AssignmentsPageActionTypes.LoadAssignmentsPages),
    map((action: fromAssignmentPageActions.LoadAssignmentsPages) => {
      let assignmentPageConfigurations = [];
      assignmentPageConfigurations = assignmentPageConfig ? assignmentPageConfig : [] ;
      return new AddAssignmentsPages(assignmentPageConfigurations);
    })
  );
}
