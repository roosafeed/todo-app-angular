import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { HttpError } from '../models/http-error.model';

const baseUrl = "https://todo-server.deta.dev";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserAuthenticated: boolean = true;

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  login(data: User): Observable<any | HttpError> {
    return this.http.post<User>(baseUrl + '/login', data).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    let errorMsg: HttpError = new HttpError();
    if(error instanceof ErrorEvent) {
      console.error(`Error: ${error}`);
      errorMsg.code = 0;
      errorMsg.message = "Something happened and could not process the request. Try again later";
    }
    else {
      errorMsg.code = error.error.code;
      errorMsg.message = error.error.msg;
    }

    return throwError(() => { return errorMsg});
  }
}
