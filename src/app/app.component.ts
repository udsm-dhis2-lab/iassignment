import {Component, OnInit} from '@angular/core';
import {AppState} from './store/reducers';
import {Store} from '@ngrx/store';
import {LoadAssignmentsPages} from './store/actions/assignments-page.actions';
import {Observable} from 'rxjs';
import {getAssignmentLoadedState, getAssignmentLoadingState, getAssignmentPageEntities, getAssignmentPageState} from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  assignmentPageLoading$: Observable<any>;
  assignmentPageLoaded$: Observable<any>;
  assignmentPageEntities$: Observable<any>;
  assignmentPageState$: Observable<any>;

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

  ngOnInit() {}
}
