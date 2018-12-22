import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notificationProperties: any;
  @Input() isSuccessful: any;
  @Input() isOffline: any;
  @Input() isError: any;
  @Input() uploadOffline: any;

  showNotification: boolean;

  constructor() {
    setTimeout(() => {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
    }, 5000);
  }

  ngOnInit() {
  }

}
