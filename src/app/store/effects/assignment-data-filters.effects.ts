import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {AssignmentDataFiltersActionTypes, UpsertAssignmentDataFilters} from '../actions/assignment-data-filters.actions';
import * as fromAssignmentActions from '../actions/assignment-data-filters.actions';
import {tap, withLatestFrom} from 'rxjs/operators';
import * as fromAssignmentDataFilterSelectors from '../selectors/assignment-data-filter.selectors';

@Injectable()
export class AssignmentDataFiltersEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions) {}

  @Effect({dispatch: false})
  loadingAssignmentsOrgunits$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersOrgunits),
    withLatestFrom(
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit),
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    tap(([action, selectedOrgunit, selectedData]: [fromAssignmentActions.AddAssignmentDataFiltersOrgunits, any, any]) => {
      if (selectedData.length > 0) {
        this.generateDataAssignments(action.payload, selectedData);
      }
    })
  );

  @Effect({dispatch: false})
  loadingAssignmentsData$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersData),
    withLatestFrom(
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit),
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    tap(([action, selectedOrgunit, selectedData]: [fromAssignmentActions.AddAssignmentDataFiltersData, any, any]) => {
      if (selectedOrgunit.length > 0) {
        this.generateDataAssignments(selectedOrgunit, action.payload);
      }
    })
  );

  generateDataAssignments(selectedOrgunits, selectedData) {
    const assignmentArray = [];
    if (selectedOrgunits.length > 1) {
      selectedOrgunits.forEach((orgunit: any) => {
        selectedData.forEach((form: any) => {
          assignmentArray.push({
            id: orgunit.id + '-' + form.id,
            orgunitId: orgunit.id,
            formId: form.id,
            isProcessing: false,
            isAssigned: (form.organisationUnits.filter(e => e.id === orgunit.id).length > 0) ? true : false
          });
        });
      });
    } else {
      if (selectedOrgunits[0].children) {
        selectedOrgunits[0].children.forEach((childOrgunit: any) => {
          selectedData.forEach((form: any) => {
            assignmentArray.push({
              id: childOrgunit.id + '-' + form.id,
              orgunitId: childOrgunit.id,
              formId: form.id,
              isProcessing: false,
              isAssigned: (form.organisationUnits.filter(e => e.id === childOrgunit.id).length > 0) ? true : false
            });
          });
        });
      } else {
        selectedData.forEach((form: any) => {
        assignmentArray.push({
          id: selectedOrgunits[0].id + '-' + form.id,
          orgunitId: selectedOrgunits[0].id,
          formId: form.id,
          isProcessing: false,
          isAssigned: (form.organisationUnits.filter(e => e.id === selectedOrgunits[0].id).length > 0) ? true : false
        });
        });
      }
    }
    this.store.dispatch(new UpsertAssignmentDataFilters(assignmentArray));
  }
}
