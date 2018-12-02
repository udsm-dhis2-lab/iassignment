import { CurrentUserService } from './current-user.service';
import { ManifestService } from './manifest.service';
import { HttpClientService } from './http-client.service';
import {AssignmentServiceService} from './assignment-service.service';

export const services: any[] = [
  ManifestService,
  HttpClientService,
  CurrentUserService,
  AssignmentServiceService
];

export * from './http-client.service';
export * from './manifest.service';
export * from './current-user.service';
export * from './assignment-service.service';
