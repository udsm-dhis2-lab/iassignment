import {Component, Input, OnInit} from '@angular/core';
import {AppState} from '../../../store/reducers';
import {Store} from '@ngrx/store';
import {AddingAssignmentDataFilters, RemovingAssignmentDataFilters} from '../../../store/actions/assignment-data-filters.actions';
import {LocalStorageService, OFFLINE_DATA} from '../../services/indexDB/local-storage.service';

@Component({
  selector: 'app-assignemt-input',
  templateUrl: './assignment-input.component.html',
  styleUrls: ['./assignment-input.component.css']
})
export class AssignmentInputComponent implements OnInit {

  @Input() assignmentObject: any;

  constructor(private store: Store<AppState>,
              private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  saveAssignmentData(assignmentObject, e, operation) {
    this.assignmentObject.isProcessing = true;
    if (navigator.onLine) {
      // this indicates that your online
      if (operation === 'add') {
        this.store.dispatch(new AddingAssignmentDataFilters(assignmentObject));
      } else if (operation === 'remove') {
        this.store.dispatch(new RemovingAssignmentDataFilters(assignmentObject));
      }
    } else {
      // this indicates that your offline
      assignmentObject.isProcessing = true;
      this.localStorage.add(OFFLINE_DATA, assignmentObject).subscribe();
    }
  }
}
