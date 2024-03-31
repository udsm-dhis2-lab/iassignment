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

  getAssignments(
    orgUnitsSelections?: any[]
  ): Observable<OrgUnitAssignmentResponse> {
    if (orgUnitsSelections) {
      return this.filterAssignments(orgUnitsSelections);
    }

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

  filterAssignments(orgUnitsSelections: any[]) {
    const orgUnitIds = orgUnitsSelections
      .filter(
        (orgUnitSelection: any) =>
          orgUnitSelection.id?.indexOf("LEVEL") === -1 &&
          orgUnitSelection.id?.indexOf("OU_GROUP") === -1
      )
      .map((orgUnit) => orgUnit.id);

    const orgUnitLevelIds = orgUnitsSelections
      .filter(
        (orgUnitSelection: any) => orgUnitSelection.id?.indexOf("LEVEL") !== -1
      )
      .map((orgUnit) => orgUnit.id?.replace("LEVEL-", ""));

    const orgUnitGroupIds = orgUnitsSelections
      .filter(
        (orgUnitSelection: any) =>
          orgUnitSelection.id?.indexOf("OU_GROUP") !== -1
      )
      .map((orgUnit) => orgUnit.id?.replace("OU_GROUP-", ""));

    let assignmentRequest;

    if (orgUnitIds.length > 0) {
      assignmentRequest = this.httpClient.get(
        `${this.#orgUnitUrlSegment}&filter=id:in:[${orgUnitIds.join(",")}]`
      );
    }

    if (orgUnitLevelIds.length > 0) {
      assignmentRequest = this.httpClient
        .get(
          `organisationUnitLevels.json?fields=id,level&filter=id:in:[${orgUnitLevelIds.join(
            ","
          )}]`
        )
        .pipe(
          switchMap((orgUnitLevelResponse) => {
            const levels = (
              orgUnitLevelResponse.organisationUnitLevels || []
            ).map((orgUnitLevel) => orgUnitLevel.level);

            if (levels.length === 0) {
              return of(null);
            }

            return this.httpClient.get(
              `${this.#orgUnitUrlSegment}${
                orgUnitIds.length > 0
                  ? `&filter=path:ilike:${orgUnitIds.join(",")}`
                  : ""
              }&filter=level:in:[${levels.join(",")}]&rootJunction=AND`
            );
          })
        );
    }

    if (orgUnitGroupIds.length > 0) {
      assignmentRequest = this.httpClient.get(
        `${this.#orgUnitUrlSegment}${
          orgUnitIds.length > 0
            ? `&filter=path:ilike:${orgUnitIds.join(",")}`
            : ""
        }&filter=organisationUnitGroups.id:in:[${orgUnitGroupIds.join(
          ","
        )}]&rootJunction=AND`
      );
    }

    if (!assignmentRequest) {
      return this.getAssignments();
    }

    return assignmentRequest.pipe(
      map((response: any) => new OrgUnitAssignmentResponse(response))
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
