import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { of, Observable } from 'rxjs/index';

@Injectable()
export class MenuNotificationService {
  constructor(private httpClient: HttpClient) {

  }

  loadNotification(rootUrl: string): Observable<any> {
    return this.httpClient.get(`${rootUrl}api/me/dashboard.json`).pipe(catchError(() => of(null)));
  }
}
