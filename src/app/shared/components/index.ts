import {ItemCardComponent} from './item-card/item-card.component';
import {HomeComponent} from './home/home.component';
import {AssignmentInputComponent} from './assignment-input/assignment-input.component';
import {PaginationComponent} from './pagination/pagination.component';
import {NotificationComponent} from './notification/notification.component';

export const sharedComponents: any[] = [
  ItemCardComponent, HomeComponent,
  AssignmentInputComponent, PaginationComponent,
  NotificationComponent
];

export * from './item-card/item-card.component';
export * from './home/home.component';
export * from './assignment-input/assignment-input.component';
export * from './pagination/pagination.component';
export * from './notification/notification.component';
