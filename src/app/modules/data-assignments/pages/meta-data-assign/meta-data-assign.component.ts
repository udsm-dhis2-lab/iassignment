import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meta-data-assign',
  templateUrl: './meta-data-assign.component.html',
  styleUrls: ['./meta-data-assign.component.css']
})
export class MetaDataAssignComponent implements OnInit {

  percent = 0;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.percent += 7;
    }, 3000);
  }

}
