import { Component, OnInit } from '@angular/core';
import {
  getAssignmentLoadedState,
  getAssignmentLoadingState,
  getAssignmentPageEntities,
  getAssignmentPageState
} from '../../../store/selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/reducers';
import {LoadAssignmentsPages} from '../../../store/actions';
import {FilterByPipe} from 'ngx-pipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterByPipe]
})
export class HomeComponent implements OnInit {

  assignmentPageLoading$: Observable<any>;
  assignmentPageLoaded$: Observable<any>;
  assignmentPageEntities$: Observable<any>;
  assignmentPageState$: Observable<any>;
  searchText = '';

  constructor(private store: Store<AppState>) {

    this.assignmentPageLoading$ = this.store.select(getAssignmentLoadingState);
    this.assignmentPageLoaded$ = this.store.select(getAssignmentLoadedState);
    this.assignmentPageEntities$ = this.store.select(getAssignmentPageEntities);
    this.assignmentPageState$ = this.store.select(getAssignmentPageState);


    // minor delay for the loaders to appear
    setTimeout(() => {
      this.store.dispatch(new LoadAssignmentsPages());
    }, 3000);
  }


  ngOnInit() {
  }

  searchingItems(e) {
    if (e) {
      e.stopPropagation();
    }
    this.searchText = e ? e.target.value.trim() : this.searchText;
  }

}
