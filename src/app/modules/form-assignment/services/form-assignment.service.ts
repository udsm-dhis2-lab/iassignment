import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService, User } from "@iapps/ngx-dhis2-http-client";
import { Observable, map, switchMap, zip } from "rxjs";
import {
  CollectionForm,
  OrgUnitAssignment,
  OrgUnitAssignmentResponse,
} from "../models";

@Injectable()
export class FormAssignmentService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getAssignments(): Observable<OrgUnitAssignmentResponse> {
    return this.httpClient.me().pipe(
      switchMap((user: User) => {
        console.log(user.organisationUnits);
        return this.httpClient.get(
          "organisationUnits.json?fields=id,name,level,dataSets,programs"
        );
      }),
      map((response) => new OrgUnitAssignmentResponse(response))
    );
  }

  getForms(): Observable<CollectionForm[]> {
    return zip(
      this.httpClient.get("dataSets.json?fields=id,name&pageSize=10"),
      this.httpClient.get("programs.json?fields=id,name&pageSize=10")
    ).pipe(
      map(([dataSetResponse, programResponse]) => {
        return [
          ...(dataSetResponse.dataSets || []).map(
            (dataSet) => new CollectionForm({ ...dataSet, type: "DATASET" })
          ),
          ...(programResponse.programs || []).map(
            (program) => new CollectionForm({ ...program, type: "PROGRAM" })
          ),
        ];
      })
    );
  }
}
