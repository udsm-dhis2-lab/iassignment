import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService, User } from "@iapps/ngx-dhis2-http-client";
import { map, switchMap, zip } from "rxjs";

@Injectable()
export class FormAssignmentService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getList() {
    return this.httpClient.me().pipe(
      switchMap((user: User) => {
        console.log(user.organisationUnits);
        return this.httpClient.get(
          "organisationUnits.json?fields=id,name,dataSets,programs"
        );
      }),
      map((response) => {
        return response.organisationUnits;
      })
    );
  }

  getForms() {
    return zip(
      this.httpClient.get("dataSets.json?fields=id,name&pageSize=10"),
      this.httpClient.get("programs.json?fields=id,name&pageSize=10")
    ).pipe(
      map(([dataSetResponse, programResponse]) => {
        return [...dataSetResponse.dataSets, ...programResponse.programs];
      })
    );
  }
}
