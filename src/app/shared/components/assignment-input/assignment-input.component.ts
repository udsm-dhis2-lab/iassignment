import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assignemt-input',
  templateUrl: './assignment-input.component.html',
  styleUrls: ['./assignment-input.component.css']
})
export class AssignmentInputComponent implements OnInit {

  @Input() assignmentObject: any;

  constructor() { }

  ngOnInit() {
  }

  saveAssignmentData(assignmentObject, e, operation) {

  }
}
