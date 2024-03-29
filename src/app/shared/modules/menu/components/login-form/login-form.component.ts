import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  credentials: any;
  loginError: string;
  loggingIn: boolean;

  constructor(private httpClient: HttpClient) {
    this.credentials = {
      username: undefined,
      password: undefined,
    };
    this.loginError = "";
  }

  ngOnInit() {}

  onSubmit(e) {
    e.stopPropagation();
    this.loggingIn = true;
    this.loginError = "";

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    this.httpClient
      .post(
        "../../../dhis-web-commons-security/login.action",
        "j_username=" +
          this.credentials.username +
          "&j_password=" +
          this.credentials.password,
        {
          headers,
        }
      )
      .pipe(catchError(this._handleError))
      .subscribe(
        () => {
          this.loggingIn = false;
        },
        (error) => {
          this.loggingIn = false;
          if (error.status === 200 && error.url.indexOf("login") !== -1) {
            this.loginError = "Incorrect username or password";
          }
        }
      );
  }

  private _handleError(err: HttpErrorResponse) {
    let error = null;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      error = {
        message: err.error,
        status: err.status,
        statusText: err.statusText,
        url: err.url,
      };
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      error = {
        message:
          err.error instanceof Object
            ? err.error.message
            : err.error
            ? err.error
            : err.message,
        status: err.status,
        statusText: err.statusText,
        url: err.url,
      };
    }

    return throwError(error);
  }
}
