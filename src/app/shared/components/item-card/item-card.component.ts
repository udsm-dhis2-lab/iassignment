import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() header;
  @Input() summary;
  @Input() imageLink;
  @Input() link;
  constructor() { }

  ngOnInit() {
  }

}
