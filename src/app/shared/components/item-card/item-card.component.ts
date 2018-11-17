import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleNavigation(e, link) {
    this.router.navigate(['/', link]);
  }

}
