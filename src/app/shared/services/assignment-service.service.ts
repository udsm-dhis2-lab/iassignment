import { Injectable } from '@angular/core';
import {NgxDhis2HttpClientService} from 'ngx-dhis2-http-client';
import {from, interval, Observable, of, throwError} from 'rxjs';
import {flatMap, mergeMap, retryWhen} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {

  constructor(private httpClient: NgxDhis2HttpClientService) { }

  makeAssignmentData(assignmentObject, payload): Observable<any> {
    const url = `${assignmentObject.formType}/${assignmentObject.formId}/organisationUnits.json`;
    return this.httpClient.post(url, payload)
      .pipe(retryWhen(() => {
        return interval(5000).pipe(
          flatMap(count => count === 3 ?
            throwError('Failed to add assignment to server, please check your internet connection') : of(count))
        );
      }));
  }

  makeAssignmentDataForAll(assignmentObject, payload): Observable<any> {
    const url = `${assignmentObject.formType}/${assignmentObject.id}/organisationUnits.json`;
    return this.httpClient.post(url, payload)
      .pipe(retryWhen(() => {
        return interval(5000).pipe(
          flatMap(count => count === 3 ?
            throwError('Failed to add assignment to server, please check your internet connection') : of(count))
        );
      }));
  }

  assignOfflineAssignments(offlinePayload: any[]): Observable<any> {
    return from(offlinePayload).pipe(
      mergeMap((payload, index) => {
        const url = `${payload.formType}/${payload.formId}/organisationUnits.json`;
        return <Observable<any>>
          this.httpClient.post(url, payload.assignmentPayload).pipe();
      })
    );
  }

}
