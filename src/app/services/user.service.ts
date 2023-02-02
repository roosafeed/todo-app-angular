import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { HttpError } from '../models/http-error.model';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL = "https://todo-server.deta.dev";
const AUTH_COOKIE = "user-auth-cookie";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserAuthenticated: boolean = true;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(data: User): Observable<any | HttpError> {
    return this.http.post<User>(BASE_URL + '/login', data).pipe(
      map((data: any) => {
        this.setAuthCookie(data.resp);
        return data;
      }),
      catchError(this.handleError)
    )
  }

  register(data: User): Observable<any | HttpError> {
    return this.http.post<User>(BASE_URL + '/register', data).pipe(
      catchError(this.handleError)
    )
  }

  verify(code:string): Observable<any | HttpError> {
    return this.http.get<any>(BASE_URL + '/verify/' + code).pipe(
      catchError(this.handleError)
    )
  }

  isAuthenticated(): boolean {
    return this.cookieService.check(AUTH_COOKIE);
  }

  getAuthUser(): User | null {
    if(this.isAuthenticated()) {
      let user = new User();
      const userCookie = this.getAuthCookie();

      user.username = userCookie.username? userCookie.username : null;
      user.fname = userCookie.fname? userCookie.fname : null;
      user.lname = userCookie.lname? userCookie.lname : null;

      return user;
    }
    return null;
  }

  getAuthToken(): string | null {
    if(this.isAuthenticated()) {
      const userCookie = this.getAuthCookie();
      return userCookie.token;
    }
    return null;
  }

  logout(): void {
    if(this.isAuthenticated()) {
      this.cookieService.delete(AUTH_COOKIE);
    }
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

  private setAuthCookie(data: any): void {
    if(this.cookieService.check(AUTH_COOKIE)) {
      this.cookieService.delete(AUTH_COOKIE);
    }
    this.cookieService.set(AUTH_COOKIE, JSON.stringify(data), {
      expires: new Date(Date.now() + 5*(1000*60*60)),
      secure: true
    });
  }

  private getAuthCookie(): any | null {
    if(this.isAuthenticated()) {
      const cookie = this.cookieService.get(AUTH_COOKIE);
      return JSON.parse(cookie);
    }
    return null
  }
  
}
