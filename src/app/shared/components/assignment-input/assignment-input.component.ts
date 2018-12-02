import {Component, Input, OnInit} from '@angular/core';
import {AppState} from '../../../store/reducers';
import {Store} from '@ngrx/store';
import {AddingAssignmentDataFilters, RemovingAssignmentDataFilters} from '../../../store/actions/assignment-data-filters.actions';

@Component({
  selector: 'app-assignemt-input',
  templateUrl: './assignment-input.component.html',
  styleUrls: ['./assignment-input.component.css']
})
export class AssignmentInputComponent implements OnInit {

  @Input() assignmentObject: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  saveAssignmentData(assignmentObject, e, operation) {
    this.assignmentObject.isProcessing = true;
    if (operation === 'add') {
      this.store.dispatch(new AddingAssignmentDataFilters(assignmentObject));
    } else if (operation === 'remove') {
      this.store.dispatch(new RemovingAssignmentDataFilters(assignmentObject));
    }
  }
}
