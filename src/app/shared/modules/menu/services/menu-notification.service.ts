import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, catchError } from "rxjs";

@Injectable()
export class MenuNotificationService {
  constructor(private httpClient: HttpClient) {}

  loadNotification(rootUrl: string): Observable<any> {
    return this.httpClient
      .get(`${rootUrl}api/me/dashboard.json`)
      .pipe(catchError(() => of(null)));
  }
}
