import {Component, OnInit} from '@angular/core';
import {AppState} from './store/reducers';
import {Store} from '@ngrx/store';
import {LoadAssignmentsPages} from './store/actions/assignments-page.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    // minor delay for the loaders to appear
    setTimeout(() => {
      this.store.dispatch(new LoadAssignmentsPages());
    }, 2000);
  }

  ngOnInit() {}
}
