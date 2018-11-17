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

  ngOnInit() {}
}
