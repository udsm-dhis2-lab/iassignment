import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './shared/services/indexDB/local-storage.service';
import {UploadOfflineAssignmentDataFilters} from './store/actions/assignment-data-filters.actions';
import {AppState} from './store/reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,
              private store: Store<AppState>) {
      // initiate indexDB localStorage
    this.localStorage.initiateStoreObjects();
   // this.store.dispatch(new UploadOfflineAssignmentDataFilters());
  }

  ngOnInit() {}
}
