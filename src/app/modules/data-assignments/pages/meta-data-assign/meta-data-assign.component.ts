import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/reducers';
import {AddAssignmentDataFiltersData, AddAssignmentDataFiltersOrgunits} from '../../../../store/actions/assignment-data-filters.actions';
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
  constructor(private store: Store<AppState>) {
    this.selectedData$ = this.store.select
      (fromAssingmentFiltersSelectors.getAssingmentDataFilterSelectedData);
    this.selectedOgunits$ = this.store.select
    (fromAssingmentFiltersSelectors.getAssingmentDataFilterSelectedOrgunit);
    this.assignmentFiltersEntities$ = this.store.select
    (fromAssingmentFiltersSelectors.getAssingmentDataFilterEntities);
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
  }

  updateData(e) {
    this.store.dispatch(new AddAssignmentDataFiltersData(e));
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

}
