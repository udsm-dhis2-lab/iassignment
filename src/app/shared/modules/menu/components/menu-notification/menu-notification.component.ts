import { Component, Input, OnInit } from '@angular/core';
import { MenuNotificationService } from '../../services/menu-notification.service';
import { MenuService } from '../../services/menu.service';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-menu-notification',
  templateUrl: './menu-notification.component.html',
  styleUrls: ['./menu-notification.component.css']
})
export class MenuNotificationComponent implements OnInit {

  @Input()
  rootUrl: string;

  menuNotification: any;

  notificationMenuLinks: any = {};

  constructor(private menuNotificationService: MenuNotificationService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuNotificationService.loadNotification(this.rootUrl).subscribe((notificationResults: any) => {
      this.menuNotification = notificationResults;
    });

    this.menuService.getSanitizedMenus().pipe(filter((result: any[]) => result.length > 0)).
      subscribe((sanitizedMenus: any) => {
        _.each(_.filter(sanitizedMenus,
          menuItem => menuItem.name.indexOf('interpretation') !== -1 || menuItem.name.indexOf('messaging') !== -1), menuItem => {
          if (menuItem.name.indexOf('interpretation') !== -1) {
            this.notificationMenuLinks['interpretation'] = menuItem.defaultAction;
          } else if (menuItem.name.indexOf('messaging') !== -1) {
            this.notificationMenuLinks['message'] = menuItem.defaultAction;
          }
        });
      });
  }

}
