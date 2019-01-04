import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {
  AssignmentDataFiltersActionTypes, AssignmentNotification, RemoveAssignAllData, RemovingAssignmentDataFilters,
  UpdateAssignmentDataFilters, UpdateAssignmentDataFilterss, UploadOfflineAssignmentDataFilters,
  UpsertAssignmentDataFilters
} from '../actions/assignment-data-filters.actions';
import * as fromAssignmentActions from '../actions/assignment-data-filters.actions';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as fromAssignmentDataFilterSelectors from '../selectors/assignment-data-filter.selectors';
import {AssignmentServiceService} from '../../shared/services/assignment-service.service';
import * as fromAssignmentHelper from '../../shared/helpers/assignment-helper';
import {LocalStorageService, OFFLINE_DATA} from '../../shared/services/indexDB/local-storage.service';
import {of} from 'rxjs';

@Injectable()
export class AssignmentDataFiltersEffects {
  payloadToAssignment: any;
  currentAssignmentPayload: any;
  assignmentUploadPayload: any;
  selectedData: any;
  selectedOrgunits: any;
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private assignmentService: AssignmentServiceService,
    private localStorage: LocalStorageService) {}

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
        const assignmentArray = fromAssignmentHelper.generateDataAssignments(action.payload, selectedData);
        this.store.dispatch(new UpsertAssignmentDataFilters(assignmentArray));
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
      this.selectedOrgunits = selectedOrgunit;
      if (selectedOrgunit.length > 0) {
        const assignmentArray = fromAssignmentHelper.generateDataAssignments(selectedOrgunit, action.payload);
        this.store.dispatch(new UpsertAssignmentDataFilters(assignmentArray));
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
        const notificationStatus =
          this.currentAssignmentPayload.formName +
          ' successful assigned to ' + this.currentAssignmentPayload.orgunitName;
      return new UpdateAssignmentDataFilters(
          {assignmentObject: this.currentAssignmentPayload,
            selectedData: this.selectedData,
            notificationStatus: notificationStatus});
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
      const notificationStatus =
        this.currentAssignmentPayload.formName +
        ' removed from ' + this.currentAssignmentPayload.orgunitName;
      return new UpdateAssignmentDataFilters(
        {assignmentObject: this.currentAssignmentPayload,
          selectedData: this.selectedData,
          notificationStatus: notificationStatus});
    })
  );

  @Effect({dispatch: false})
  assigningAllData$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AssignAllData),
    withLatestFrom(this.store.select
    (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
    map(([action, selectedData, displayingOrgunits]: [fromAssignmentActions.AssignAllData, any, any]) => {
      this.selectedData = selectedData;
      this.selectedOrgunits = displayingOrgunits;
      const orgunitArray = [];
        displayingOrgunits.map(orgunit => orgunitArray.push({id: orgunit.id}));
      this.payloadToAssignment = {
        additions: orgunitArray,
        deletions: [ ]
      };
      this.currentAssignmentPayload = action.payload ? action.payload : {};
    }),
    switchMap(() =>
      this.assignmentService.makeAssignmentDataForAll
      (this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      let assignmentArray = [];
      this.selectedData.forEach((form: any) => {
        if (form.id === this.currentAssignmentPayload.id) {
          form.organisationUnits =
            fromAssignmentHelper.removeDuplicates
            ([...form.organisationUnits, ...this.payloadToAssignment.additions], 'id');
          assignmentArray = fromAssignmentHelper.generateDataAssignments(this.selectedOrgunits, this.selectedData);
        }
      });
      return new UpdateAssignmentDataFilterss({
        assignmentArray: assignmentArray,
        notificationStatus: this.currentAssignmentPayload.name +
        ' successful assigned all selected facilities'
      });
    }),
    catchError(error => of(this.store.dispatch(new AssignmentNotification(error))))
  );

  @Effect({dispatch: false})
  removingingAllData$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.RemoveAssignAllData),
    withLatestFrom(this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
      this.store.select
      (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
    map(([action, selectedData, displayingOrgunits]: [fromAssignmentActions.AssignAllData, any, any]) => {
      this.selectedData = selectedData;
      this.selectedOrgunits = displayingOrgunits;
      const orgunitArray = [];
      displayingOrgunits.map(orgunit => orgunitArray.push({id: orgunit.id}));
      this.payloadToAssignment = {
        additions: [],
        deletions: orgunitArray
      };
      this.currentAssignmentPayload = action.payload ? action.payload : {};
    }),
    switchMap(() =>
      this.assignmentService.makeAssignmentDataForAll
      (this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      let assignmentArray = [];
      this.selectedData.forEach((form: any) => {
        if (form.id === this.currentAssignmentPayload.id) {
          const removalArrayItems = this.payloadToAssignment.deletions;
          const newOrgunitArray = fromAssignmentHelper.removeArrayObjects
          (form.organisationUnits, removalArrayItems, 'id');
          form.organisationUnits = newOrgunitArray;
          assignmentArray = fromAssignmentHelper.generateDataAssignments(this.selectedOrgunits, this.selectedData);
        }
      });
      return new UpdateAssignmentDataFilterss({
        assignmentArray: assignmentArray,
        notificationStatus: this.currentAssignmentPayload.name +
        ' removed from all selected facilities'
      });
    }),
    catchError(error => of(this.store.dispatch(new AssignmentNotification(error))))
  );

  @Effect({dispatch: false})
  uploadingOfflineAssignments$ = this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.UploadOfflineAssignmentDataFilters),
    mergeMap(() => this.localStorage.getAll(OFFLINE_DATA)),
    map((offlineData: any) => {
      const assignmentUploadPayload = [];
      if (offlineData.length > 0) {
        offlineData.forEach((data: any) => {
          if (data.isAssigned) {
            // make object for deletion
            assignmentUploadPayload.push({
              ...data,
              assignmentPayload: {
                additions: [ ],
                deletions: [ { id: data.orgunitId ? data.orgunitId : '' } ]
              }
            });
          } else {
            // make object for addition
            assignmentUploadPayload.push({
              ...data,
              assignmentPayload: {
                additions: [{id: data.orgunitId ? data.orgunitId : ''}],
                deletions: []
              }
            });
          }
        });
      }
      this.assignmentUploadPayload = assignmentUploadPayload;
    }),
    switchMap(() => this.assignmentService.assignOfflineAssignments(this.assignmentUploadPayload)),
    catchError(error => of())
  );

}
