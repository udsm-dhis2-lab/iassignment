import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {
  AssignmentDataFiltersActionTypes, AssignmentNotification, RemoveAssignAllData, RemovingAssignmentDataFilters,
  UpdateAssignmentDataFilters, UpdateAssignmentDataFilterss, UploadOfflineAssignmentDataFilters,
  UpsertAssignmentDataFilters,
  AddAssignmentDataFiltersOrgunits
} from '../actions/assignment-data-filters.actions';
import * as fromAssignmentActions from '../actions/assignment-data-filters.actions';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as fromAssignmentDataFilterSelectors from '../selectors/assignment-data-filter.selectors';
import {AssignmentServiceService} from '../../shared/services/assignment-service.service';
import * as fromAssignmentHelper from '../../shared/helpers/assignment-helper';
import {LocalStorageService, OFFLINE_DATA} from '../../shared/services/indexDB/local-storage.service';
import {of} from 'rxjs';
import * as fromHelpers from '../../shared/helpers/assignment-helper';

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

  
  triggerOrgunitsAdditional$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.TriggerAssignmentDataFiltersOrgunits),
    map((action: fromAssignmentActions.TriggerAssignmentDataFiltersOrgunits) => {
      const ouPayload = action.payload ? action.payload : [];
      const filteredOUoptions = ouPayload.filter(item => item.id.includes('OU_') || item.id.includes('LEVEL'));
      let selectedOrgunits = ouPayload.filter(item => !item.id.includes('OU_') || !item.id.includes('LEVEL'));
      if (filteredOUoptions.length) {
        // this means selections have additional options
        const ouOptions =  filteredOUoptions.map(item => item.id).join(';');
        this.assignmentService.getAnalyticsOrgunits(ouOptions, selectedOrgunits).subscribe(analytics => {
          const analyticsProperties = fromHelpers.getAnalyticsProperties(analytics);
          selectedOrgunits = (analyticsProperties.metaData.ou || []).map(ou => {
            const ouName = analyticsProperties.metaDataItems[ou].name ?
            analyticsProperties.metaDataItems[ou].name : analyticsProperties.metaDataItems[ou];
            return {id: ou, name: ouName };
          });
          selectedOrgunits = fromHelpers.sortAlphabetical(selectedOrgunits, 'name');
            // Now add analytics orgunits to store
          this.store.dispatch(new AddAssignmentDataFiltersOrgunits(selectedOrgunits));
        });
      } else {
        // Now add orgunits to store
        this.store.dispatch(new AddAssignmentDataFiltersOrgunits(selectedOrgunits));
      }
    })
  ), {dispatch: false});

  
  loadingAssignmentsOrgunits$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersOrgunits),
    withLatestFrom(
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit),
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    tap(([action, selectedOrgunit, selectedData]:
           [fromAssignmentActions.AddAssignmentDataFiltersOrgunits, any, any]) => {
      if (selectedData.length > 0) {
        const assignmentArray = fromAssignmentHelper.generateDataAssignments(action.payload, selectedData);
        this.store.dispatch(new UpsertAssignmentDataFilters(assignmentArray));
      }
    })
  ), {dispatch: false});

  
  loadingAssignmentsData$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddAssignmentDataFiltersData),
    withLatestFrom(
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit),
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData)),
    tap(([action, selectedOrgunit, selectedData]:
           [fromAssignmentActions.AddAssignmentDataFiltersData, any, any]) => {
      this.selectedOrgunits = selectedOrgunit;
      if (selectedOrgunit.length > 0) {
        const assignmentArray = fromAssignmentHelper.generateDataAssignments(selectedOrgunit, action.payload);
        this.store.dispatch(new UpsertAssignmentDataFilters(assignmentArray));
      }
    })
  ), {dispatch: false});

  
  addingAssignmentProp$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AddingAssignmentDataFilters),
    withLatestFrom(
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
    map(([action, selectedData, selectedOrgunit]:
           [fromAssignmentActions.AddingAssignmentDataFilters, any, any]) => {
      this.selectedData = selectedData;
      this.selectedOrgunits = selectedOrgunit;
      this.payloadToAssignment = {
        additions: [ { id: action.payload ? action.payload.orgunitId : '' } ],
        deletions: [ ]
      };
      this.currentAssignmentPayload = action.payload ? action.payload : {};
    }),
    switchMap(() =>
      this.assignmentService
      .makeAssignmentData(this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      this.currentAssignmentPayload.isAssigned = true;
      this.currentAssignmentPayload.isProcessing = false;
        this.selectedData.forEach((form: any) => {
          if (form.id === this.currentAssignmentPayload.formId) {
            form.organisationUnits =
              form.organisationUnits.concat(this.payloadToAssignment.additions);
          }
        });
        // console.log(JSON.stringify(this.selectedOrgunits));
        const orgunitsCollections = fromAssignmentHelper
        .updateSelectedOrgunitdataAssigned(this.selectedOrgunits, this.currentAssignmentPayload, 'add');
        const notificationStatus =
          this.currentAssignmentPayload.formName +
          ' successful assigned to ' + this.currentAssignmentPayload.orgunitName;
      return new UpdateAssignmentDataFilters(
          { assignmentObject: this.currentAssignmentPayload,
            selectedData: this.selectedData,
            orgunitTodisplay: orgunitsCollections.orgunitTodisplay,
            selectedOrgunits: orgunitsCollections.selectedOrgunits,
            notificationStatus: notificationStatus});
    })
  ));

  
  removingAssignmentProp$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.RemovingAssignmentDataFilters),
    withLatestFrom(
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
    map(([action, selectedData, selectedOrgunit]:
           [fromAssignmentActions.RemovingAssignmentDataFilters, any, any]) => {
      this.selectedData = selectedData;
      this.selectedOrgunits = selectedOrgunit;
      this.payloadToAssignment = {
        additions: [ ],
        deletions: [ { id: action.payload ? action.payload.orgunitId : '' } ]
      };
      this.currentAssignmentPayload = action.payload ? action.payload : {};
    }),
    switchMap(() =>
      this.assignmentService
      .makeAssignmentData(this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      this.currentAssignmentPayload.isAssigned = false;
      this.currentAssignmentPayload.isProcessing = false;
      this.selectedData.forEach((form: any) => {
        if (form.id === this.currentAssignmentPayload.formId) {
          const toDelete = new Set([this.currentAssignmentPayload.orgunitId]);
          form.organisationUnits = form.organisationUnits.filter(obj => !toDelete.has(obj.id));
        }
      });
      const orgunitsCollections = fromAssignmentHelper
      .updateSelectedOrgunitdataAssigned(this.selectedOrgunits, this.currentAssignmentPayload, 'remove');
      const notificationStatus =
        this.currentAssignmentPayload.formName +
        ' removed from ' + this.currentAssignmentPayload.orgunitName;
      return new UpdateAssignmentDataFilters(
        {assignmentObject: this.currentAssignmentPayload,
          selectedData: this.selectedData,
          notificationStatus: notificationStatus,
          orgunitTodisplay: orgunitsCollections.orgunitTodisplay,
          selectedOrgunits: orgunitsCollections.selectedOrgunits,
        });
    })
  ));

  // @Effect({dispatch: false})
  // assigningAllData$ = this.actions$.pipe(
  //   ofType(AssignmentDataFiltersActionTypes.AssignAllData),
  //   withLatestFrom(this.store.select
  //   (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
  //     this.store.select
  //     (fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
  //   switchMap(([action, selectedData, displayingOrgunits]: [fromAssignmentActions.AssignAllData, any, any]) =>
  //     this.assignmentService.makeAssignmentDataForAll
  //     (action.payload ? action.payload : {}, {
  //       additions: displayingOrgunits.map(orgunit => { return {id: orgunit.id}; }),
  //       deletions: [ ]
  //     }).pipe(map((response: any) => {
  //         let assignmentArray = [];
  //         selectedData.forEach((form: any) => {
  //           if (form.id === response.assignmentObject.id) {
  //             form.organisationUnits =
  //               fromAssignmentHelper.removeDuplicates
  //               ([...form.organisationUnits, ...response.payload.additions], 'id');
  //             assignmentArray = fromAssignmentHelper.generateDataAssignments(displayingOrgunits, selectedData);
  //           }
  //         });
  //         return new UpdateAssignmentDataFilterss({
  //           assignmentArray: assignmentArray,
  //           notificationStatus: action.payload.name +
  //           ' successful assigned all selected facilities'
  //         });
  //       }),
  //       catchError(error => of(this.store.dispatch(new AssignmentNotification(error))))))
  //
  // );

  
  assigningAllData$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.AssignAllData),
    withLatestFrom(
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
    map(([action, selectedData, displayingOrgunits]: [fromAssignmentActions.AssignAllData, any, any]) => {
      this.selectedData = selectedData;
      this.selectedOrgunits = displayingOrgunits;
      this.currentAssignmentPayload = action.payload ? action.payload : {};
      const orgunitArray = [];
      const storeEntityUpdate = [];
      displayingOrgunits.forEach((orgunit: any) => {
        orgunitArray.push({id: action.payload.id});
        storeEntityUpdate.push({
          id: orgunit.id + '-' + action.payload.id,
          orgunitId: orgunit.id,
          orgunitName: orgunit.name,
          formName: action.payload.name,
          formType: action.payload.formType,
          formId: action.payload.id,
          isProcessing: true,
          isAssigned: false
        });
      });
      this.store.dispatch(new UpdateAssignmentDataFilterss({
        assignmentArray: storeEntityUpdate,
        orgunitTodisplay: displayingOrgunits,
        notificationStatus: 'Offline: Processing selected data for assignment'
      }));
      this.payloadToAssignment = {
        additions: orgunitArray,
        deletions: [ ]
      };

    }),
    switchMap(() =>
      this.assignmentService
      .makeAssignmentDataForAll(this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      const storeEntityUpdate = [];
      this.selectedOrgunits.forEach((orgunit: any) => {
        // orgunitArray.push({id: action.payload.id});
        storeEntityUpdate.push({
          id: orgunit.id + '-' + this.currentAssignmentPayload.id,
          orgunitId: orgunit.id,
          orgunitName: orgunit.name,
          formName: this.currentAssignmentPayload.name,
          formType: this.currentAssignmentPayload.formType,
          formId: this.currentAssignmentPayload.id,
          isProcessing: false,
          isAssigned: true
        });
      });
      const orgunitsCollections = fromAssignmentHelper
      .updateOrgunitsOnBulkAssignments(this.selectedOrgunits, this.currentAssignmentPayload, 'addAll');
      this.store.dispatch(new UpdateAssignmentDataFilterss({
        assignmentArray: storeEntityUpdate,
        orgunitTodisplay: orgunitsCollections,
        // selectedOrgunits: orgunitsCollections,
        notificationStatus: this.currentAssignmentPayload.name +
        ' successful assigned all selected facilities'
      }));
    }),
    catchError(error => of(this.store.dispatch(new AssignmentNotification(error))))
  ), {dispatch: false});

  
  removingingAllData$ = createEffect(() => this.actions$.pipe(
    ofType(AssignmentDataFiltersActionTypes.RemoveAssignAllData),
    withLatestFrom(
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedData),
      this.store.select(fromAssignmentDataFilterSelectors.getAssingmentDataFilterSelectedOrgunit)),
    map(([action, selectedData, displayingOrgunits]: [fromAssignmentActions.AssignAllData, any, any]) => {
      this.selectedData = selectedData;
      this.selectedOrgunits = displayingOrgunits;
      this.currentAssignmentPayload = action.payload ? action.payload : {};
      const orgunitArray = [];
      const storeEntityUpdate = [];
      displayingOrgunits.forEach((orgunit: any) => {
        orgunitArray.push({id: action.payload.id});
        storeEntityUpdate.push({
          id: orgunit.id + '-' + action.payload.id,
          orgunitId: orgunit.id,
          orgunitName: orgunit.name,
          formName: action.payload.name,
          formType: action.payload.formType,
          formId: action.payload.id,
          isProcessing: true,
          isAssigned: false
        });
      });
      this.store.dispatch(new UpdateAssignmentDataFilterss({
        assignmentArray: storeEntityUpdate,
        orgunitTodisplay: displayingOrgunits,
        notificationStatus: 'Offline: Processing selected data for assignment'
      }));
      this.payloadToAssignment = {
        additions: [],
        deletions: orgunitArray
      };
    }),
    switchMap(() =>
      this.assignmentService.makeAssignmentDataForAll
      (this.currentAssignmentPayload, this.payloadToAssignment)),
    map((response: any) => {
      const storeEntityUpdate = [];
      this.selectedOrgunits.forEach((orgunit: any) => {
        // orgunitArray.push({id: action.payload.id});
        storeEntityUpdate.push({
          id: orgunit.id + '-' + this.currentAssignmentPayload.id,
          orgunitId: orgunit.id,
          orgunitName: orgunit.name,
          formName: this.currentAssignmentPayload.name,
          formType: this.currentAssignmentPayload.formType,
          formId: this.currentAssignmentPayload.id,
          isProcessing: false,
          isAssigned: false
        });
      });
      const orgunitsCollections = fromAssignmentHelper
      .updateOrgunitsOnBulkAssignments(this.selectedOrgunits, this.currentAssignmentPayload, 'removeAll');
      this.store.dispatch(new UpdateAssignmentDataFilterss({
        assignmentArray: storeEntityUpdate,
        orgunitTodisplay: orgunitsCollections,
        // selectedOrgunits: orgunitsCollections,
        notificationStatus: this.currentAssignmentPayload.name +
        ' removed from all selected facilities'
      }));
    }),
    catchError(error => of(this.store.dispatch(new AssignmentNotification(error))))
  ), {dispatch: false});

  
  uploadingOfflineAssignments$ = createEffect(() => this.actions$.pipe(
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
  ), {dispatch: false});

}
