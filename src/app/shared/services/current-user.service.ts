import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';

@Injectable()
export class CurrentUserService {
  constructor(private httpClient: HttpClientService) {}

  loadUser(): Observable<any> {
    return this.httpClient
      .get(`me.json?fields=id,name,displayName,created,
      lastUpdated,email,dataViewOrganisationUnits[id,name,level,parent[id,name],children[id,name,parent[id,name]]],
      organisationUnits[id,name,level,parent[id,name],children[id,name,parent[id,name]]],userCredentials[username,userRoles[id,name]]`);
  }
}
