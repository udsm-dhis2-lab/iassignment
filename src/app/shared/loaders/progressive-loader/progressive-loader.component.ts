import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progressive-loader',
  templateUrl: './progressive-loader.component.html',
  styleUrls: ['./progressive-loader.component.css']
})
export class ProgressiveLoaderComponent implements OnInit {
  @Input()
  height;
  @Input()
  width;
  @Input()
  borderRadius;
  @Input()
  padding;
  constructor() { }

  ngOnInit() {
  }

}
