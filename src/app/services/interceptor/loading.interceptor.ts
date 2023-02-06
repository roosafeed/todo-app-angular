import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize, Observable, Subject, tap } from 'rxjs';
import { MessagingService } from '../messaging.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private messageService: MessagingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.messageService.setLoading(true); 
    
    return next.handle(request).pipe(
      tap((event) => {
        if(event instanceof HttpResponse) {
          this.messageService.setLoading(false);         
        }
      }),
      finalize(() => {
        this.messageService.setLoading(false); 
      })
    )
  }
}
