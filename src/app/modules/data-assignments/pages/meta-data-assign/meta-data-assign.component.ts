import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/reducers';
import {
  AddAssignmentDataFiltersData,
  AddAssignmentDataFiltersOrgunits,
  AssignAllData, RemoveAssignAllData
} from '../../../../store/actions/assignment-data-filters.actions';
import {Observable} from 'rxjs';
import * as fromAssingmentFiltersSelectors from '../../../../store/selectors/assignment-data-filter.selectors';
import {FilterByPipe} from 'ngx-pipes';

@Component({
  selector: 'app-meta-data-assign',
  templateUrl: './meta-data-assign.component.html',
  styleUrls: ['./meta-data-assign.component.css'],
  providers: [FilterByPipe]
})
export class MetaDataAssignComponent implements OnInit {
  showOrgUnitFilter: boolean;
  selectedOgunits$: Observable<any>;
  selectedData$: Observable<any>;
  assignmentFiltersEntities$: Observable<any>;
  searchText = '';
  page = 1;
  itemsPerPage = 10;
  orgunitToggle: any;
  dataToggle: any;
  layoutToggle: any;
  showNotificationContents: any;
  showNotificationPopup: boolean;
  constructor(private store: Store<AppState>) {
    this.orgunitToggle = 'none';
    this.dataToggle = 'none';
    this.layoutToggle = 'none';
    this.selectedData$ = this.store.select
      (fromAssingmentFiltersSelectors.getAssingmentDataFilterSelectedData);
    this.selectedOgunits$ = this.store.select
    (fromAssingmentFiltersSelectors.getAssingmentDataFilterSelectedOrgunit);
    this.assignmentFiltersEntities$ = this.store.select
    (fromAssingmentFiltersSelectors.getAssingmentDataFilterEntities);
    this.store.select(fromAssingmentFiltersSelectors.getAssingmentNotification)
      .subscribe((notification: string) => {
        if (notification.includes('successful') || notification.includes('removed')) {
          this.showNotification(notification, true);
        } else if (notification.includes('Error') || notification.includes('Fail')) {
          this.showNotification(notification, false, true);
        } else if (notification.includes('Offline')) {
          this.showNotification(notification, false, false, true);
        }
    });
  }

  ngOnInit() {}

  searchingItems(e) {
    if (e) {
      e.stopPropagation();
    }
    this.searchText = e ? e.target.value.trim() : this.searchText;
  }

  updateOrgUnit(e) {
    if (e.items.length > 0) {
      this.store.dispatch(new AddAssignmentDataFiltersOrgunits(e.items));
    }
      // close orgunit-component view
   this.closeFilter(e);
  }

  openOrgunit(e) {
    if (this.orgunitToggle === 'block') {
      this.orgunitToggle = 'none';
    } else if (this.orgunitToggle === 'none') {
      this.orgunitToggle = 'block';
    }
  }

  closeFilter(e) {
    this.orgunitToggle = 'none';
    this.dataToggle = 'none';
    this.layoutToggle = 'none';
  }

  openDataFilter(e) {
    if (this.dataToggle === 'block') {
      this.dataToggle = 'none';
    } else if (this.dataToggle === 'none') {
      this.dataToggle = 'block';
    }
  }

  updateData(e) {
    this.store.dispatch(new AddAssignmentDataFiltersData(e));
    // close filter-component view
    this.closeFilter(e);
  }

  openLayoutFilter(e) {
    if (this.layoutToggle === 'block') {
      this.layoutToggle = 'none';
    } else if (this.layoutToggle === 'none') {
      this.layoutToggle = 'block';
    }
  }

  updateLayout(e) {
    // close filter-component view
    this.closeFilter(e);
    this.showNotification('Layout feature is currently unavailable', false, false, true);
  }

  getArrayOfnItems(items) {
    return Array.apply(null, {length: items}).map(Number.call, Number);
  }

  onCurrentPageUpdate(e) {
    this.page = e;
  }

  onUpdatePageSize(e) {
    this.itemsPerPage = e;
  }

  assignAll(form) {
    this.store.dispatch(new AssignAllData(form));
  }

  removeAll(form) {
    this.store.dispatch(new RemoveAssignAllData(form));
  }

  showNotification(notificationProperties: any, isSuccessful?: boolean,
                   isError?: boolean, isOffline?: boolean, uploadOffline?: boolean ) {
    this.showNotificationContents = {
      notificationProperties: notificationProperties,
      isSuccessful: isSuccessful ? isSuccessful : false,
      isError: isError ? isError : false,
      isOffline: isOffline ? isOffline : false,
      uploadOffline: uploadOffline ? uploadOffline : false
    };
    this.showNotificationPopup = true;
    setTimeout(() => {
      this.showNotificationPopup = false;
    }, 3000);
  }

}
