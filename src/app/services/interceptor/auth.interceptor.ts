import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request));
  }

  private addToken(request: HttpRequest<any>) {
    if(this.userService.isAuthenticated()) {
      
      const token = this.userService.getAuthToken();

      return request.clone({
        setHeaders: {
          Authorization: token? token : ''
        }
      })
    }

    return request;
  }
}
