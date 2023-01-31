import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private errorMessageSubject = new BehaviorSubject<string>("");
  errorMessage = this.errorMessageSubject.asObservable();

  constructor() { }

  setErrorMessage(msg: string) {
    this.errorMessageSubject.next(msg);
  }
}
