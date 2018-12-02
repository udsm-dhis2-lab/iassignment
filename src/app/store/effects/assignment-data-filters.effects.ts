import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {
  AssignmentDataFiltersActionTypes, RemovingAssignmentDataFilters,
  UpdateAssignmentDataFilters,
  UpsertAssignmentDataFilters
} from '../actions/assignment-data-filters.actions';
import * as fromAssignmentActions from '../actions/assignment-data-filters.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as fromAssignmentDataFilterSelectors from '../selectors/assignment-data-filter.selectors';
import {AssignmentServiceService} from '../../shared/services/assignment-service.service';

@Injectable()
export class AssignmentDataFiltersEffects {
  payloadToAssignment: any;
  currentAssignmentPayload: any;
  selectedData: any;
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private assignmentService: AssignmentServiceService) {}

  @Effect({dispatch: false})
  loadingAssignmentsOrgunits$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersOrgunits),
    withLatestFrom(
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit),
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    tap(([action, selectedOrgunit, selectedData]:
           [fromAssignmentActions.AddAssignmentDataFiltersOrgunits, any, any]) => {
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
    tap(([action, selectedOrgunit, selectedData]:
           [fromAssignmentActions.AddAssignmentDataFiltersData, any, any]) => {
      if (selectedOrgunit.length > 0) {
        this.generateDataAssignments(selectedOrgunit, action.payload);
      }
    })
  );

  @Effect()
  addingAssignmentProp$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddingAssignmentDataFilters),
    withLatestFrom(this.store.select
    (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    map(([action, selectedData]:
           [fromAssignmentActions.AddingAssignmentDataFilters, any]) => {
      this.selectedData = selectedData;
      this.payloadToAssignment = {
        additions: [ { id: action.payload ? action.payload.orgunitId : '' } ],
        deletions: [ ]
      };
      this.currentAssignmentPayload = action.payload ? action.payload : {};
    }),
    switchMap(() =>
      this.assignmentService.makeAssignmentData
      (this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      this.currentAssignmentPayload.isAssigned = true;
      this.currentAssignmentPayload.isProcessing = false;
        this.selectedData.forEach((form: any) => {
          if (form.id === this.currentAssignmentPayload.formId) {
            form.organisationUnits =
              form.organisationUnits.concat(this.payloadToAssignment.additions);
          }
        });
        return new UpdateAssignmentDataFilters(
          {assignmentObject: this.currentAssignmentPayload, selectedData: this.selectedData});
    })
  );

  @Effect()
  removingAssignmentProp$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.RemovingAssignmentDataFilters),
    withLatestFrom(this.store.select
    (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    map(([action, selectedData]:
           [fromAssignmentActions.RemovingAssignmentDataFilters, any]) => {
      this.selectedData = selectedData;
      this.payloadToAssignment = {
        additions: [ ],
        deletions: [ { id: action.payload ? action.payload.orgunitId : '' } ]
      };
      this.currentAssignmentPayload = action.payload ? action.payload : {};
    }),
    switchMap(() =>
      this.assignmentService.makeAssignmentData
      (this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      this.currentAssignmentPayload.isAssigned = false;
      this.currentAssignmentPayload.isProcessing = false;
      this.selectedData.forEach((form: any) => {
        if (form.id === this.currentAssignmentPayload.formId) {
          const toDelete = new Set([this.currentAssignmentPayload.orgunitId]);
          form.organisationUnits = form.organisationUnits.filter(obj => !toDelete.has(obj.id));
        }
      });
      return new UpdateAssignmentDataFilters(
        {assignmentObject: this.currentAssignmentPayload, selectedData: this.selectedData});
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
            orgunitName: orgunit.name,
            formName: form.name,
            formType: form.formType,
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
              orgunitName: childOrgunit.name,
              formName: form.name,
              formType: form.formType,
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
          orgunitName: selectedOrgunits[0].name,
          formName: form.name,
          formType: form.formType,
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
