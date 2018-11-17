
import {timer as observableTimer,  Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class SystemStateService {
  private _loggingStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient) {
    // this._loggingStatus$.next(true);
  }

  checkOnlineStatus() {
    return observableTimer(1000, 30000).pipe(switchMap(() => of(navigator.onLine)), tap((onlineStatus) => {
      this._checkLoginStatus(onlineStatus);
    }));
  }

  private _checkLoginStatus(isOnline: boolean) {

    if (isOnline) {

      this.pingServer().subscribe((pingResult: any) => {
        this._loggingStatus$.next(pingResult.loggedIn);
      }, (error) => {
        if (isOnline) {
          this._loggingStatus$.next(false);
        }
      });
    } else {
      this._loggingStatus$.next(true);
    }
  }

  getLoginStatus() {
    return this._loggingStatus$.asObservable();
  }

  pingServer(): Observable<any> {
    return this.httpClient.get('../../../dhis-web-commons-stream/ping.action');
  }
}
