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

  #orgUnitUrlSegment =
    "organisationUnits.json?fields=id,name,level,dataSets,programs&order=name:ASC";

  getAssignments(): Observable<OrgUnitAssignmentResponse> {
    return this.httpClient.me().pipe(
      switchMap((user: User) => {
        const userOrgUnitIds = user.organisationUnits.map(
          (userOrgUnit) => userOrgUnit.id
        );

        return zip(
          this.httpClient.get(
            `${this.#orgUnitUrlSegment}&filter=id:in:[${userOrgUnitIds.join(
              ","
            )}]`
          ),
          this.httpClient.get(
            `${
              this.#orgUnitUrlSegment
            }&filter=parent.id:in:[${userOrgUnitIds.join(",")}]`
          )
        );
      }),
      map((responses: any[]) => {
        const [userOrgUnitResponse, userChildrenOrgUnitResponse] = responses;

        return new OrgUnitAssignmentResponse({
          pager: userChildrenOrgUnitResponse.pager,
          organisationUnits: [
            ...userOrgUnitResponse.organisationUnits,
            ...userChildrenOrgUnitResponse.organisationUnits,
          ],
        });
      })
    );
  }

  searchAssignment(searchTerm) {
    if (!searchTerm || searchTerm.length === 0) {
      return this.getAssignments();
    }

    return this.httpClient
      .get(`${this.#orgUnitUrlSegment}&filter=name:ilike:${searchTerm}`)
      .pipe(map((response) => new OrgUnitAssignmentResponse(response)));
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
