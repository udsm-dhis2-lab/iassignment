import { CurrentUserService } from './current-user.service';
import { ManifestService } from './manifest.service';
import { HttpClientService } from './http-client.service';

export const services: any[] = [
  ManifestService,
  HttpClientService,
  CurrentUserService
];

export * from './http-client.service';
export * from './manifest.service';
export * from './current-user.service';
