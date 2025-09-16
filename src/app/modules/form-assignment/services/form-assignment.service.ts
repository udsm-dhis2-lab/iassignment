import { Injectable } from "@angular/core";
import { D2Window, User } from "@iapps/d2-web-sdk";
import { Observable, from, map, of, switchMap, zip } from "rxjs";
import { AssignmentRequestObject, OrgUnitAssignmentResponse } from "../models";

@Injectable()
export class FormAssignmentService {
  constructor() {}

  #orgUnitUrlSegment =
    "organisationUnits.json?fields=id,name,level,dataSets,programs&order=name:ASC";

  getAssignments(
    orgUnitsSelections?: any[]
  ): Observable<OrgUnitAssignmentResponse> {
    if (orgUnitsSelections) {
      return this.filterAssignments(orgUnitsSelections);
    }

    const d2 = (window as unknown as D2Window)?.d2Web;

    return of(d2?.currentUser).pipe(
      switchMap((user: User) => {
        const userOrgUnitIds = user.organisationUnits.map(
          (userOrgUnit) => userOrgUnit.id
        );

        return zip(
          from(
            d2.httpInstance?.get(
              `${this.#orgUnitUrlSegment}&filter=id:in:[${userOrgUnitIds.join(
                ","
              )}]`
            )
          ).pipe(map((response) => response.data)),
          from(
            d2.httpInstance?.get(
              `${
                this.#orgUnitUrlSegment
              }&filter=parent.id:in:[${userOrgUnitIds.join(",")}]`
            )
          ).pipe(map((response) => response.data))
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
    const d2 = (window as unknown as D2Window)?.d2Web;
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
      assignmentRequest = from(
        d2.httpInstance?.get(
          `${this.#orgUnitUrlSegment}&filter=id:in:[${orgUnitIds.join(",")}]`
        )
      ).pipe(map((response) => response.data));
    }

    if (orgUnitLevelIds.length > 0) {
      assignmentRequest = from(
        d2.httpInstance?.get(
          `organisationUnitLevels.json?fields=id,level&filter=id:in:[${orgUnitLevelIds.join(
            ","
          )}]`
        )
      ).pipe(
        switchMap(({ data: orgUnitLevelResponse }) => {
          const levels = (
            (orgUnitLevelResponse.organisationUnitLevels as unknown as Record<
              string,
              unknown
            >[]) || []
          ).map((orgUnitLevel) => orgUnitLevel.level);

          if (levels.length === 0) {
            return of(null);
          }

          return from(
            d2?.httpInstance?.get(
              `${this.#orgUnitUrlSegment}${
                orgUnitIds.length > 0
                  ? `&filter=path:ilike:${orgUnitIds.join(",")}`
                  : ""
              }&filter=level:in:[${levels.join(",")}]&rootJunction=AND`
            )
          ).pipe(map((response) => response.data));
        })
      );
    }

    if (orgUnitGroupIds.length > 0) {
      assignmentRequest = from(
        d2?.httpInstance?.get(
          `${this.#orgUnitUrlSegment}${
            orgUnitIds.length > 0
              ? `&filter=path:ilike:${orgUnitIds.join(",")}`
              : ""
          }&filter=organisationUnitGroups.id:in:[${orgUnitGroupIds.join(
            ","
          )}]&rootJunction=AND`
        )
      ).pipe(map((response) => response.data));
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

    const d2 = (window as unknown as D2Window)?.d2Web;
    return from(
      d2?.httpInstance?.get(
        `${this.#orgUnitUrlSegment}&filter=name:ilike:${searchTerm}`
      )
    ).pipe(map(({ data }) => new OrgUnitAssignmentResponse(data)));
  }

  saveAssignments(assignmentRequests: AssignmentRequestObject[]) {
    const d2 = (window as unknown as D2Window)?.d2Web;
    return zip(
      assignmentRequests.map((request) =>
        from(d2?.httpInstance?.post(request.url, request.payload)).pipe(
          map((response) => response.data)
        )
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
