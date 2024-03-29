import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService, User } from "@iapps/ngx-dhis2-http-client";
import { Observable, catchError, map, of, switchMap, zip } from "rxjs";
import {
  AssignmentRequestObject,
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
    ).pipe(map(this.#getFormResponse));
  }

  searchForms(searchTerm: string) {
    if (searchTerm?.length === 0) {
      return this.getForms();
    }

    return zip(
      this.httpClient.get(
        `dataSets.json?fields=id,name&filter=name:ilike:${searchTerm}`
      ),
      this.httpClient.get(
        `programs.json?fields=id,name&filter=name:ilike:${searchTerm}`
      )
    ).pipe(map(this.#getFormResponse));
  }

  #getFormResponse(responses: any[]) {
    const [dataSetResponse, programResponse] = responses;
    return [
      ...(dataSetResponse.dataSets || []).map(
        (dataSet) => new CollectionForm({ ...dataSet, type: "DATASET" })
      ),
      ...(programResponse.programs || []).map(
        (program) => new CollectionForm({ ...program, type: "PROGRAM" })
      ),
    ];
  }

  saveAssignments(assignmentRequests: AssignmentRequestObject[]) {
    return zip(
      assignmentRequests.map((request) =>
        this.httpClient.post(request.url, request.payload)
      )
    ).pipe(
      map((responses: any[]) => {
        return (responses || []).map((response, responseIndex) => {
          const requestObject = assignmentRequests[responseIndex];
          return {
            httpStatus: response.httpStatus,
            isSavedSuccessful: response?.response?.status === "OK",
            requestObject,
          };
        });
      })
    );
  }
}
