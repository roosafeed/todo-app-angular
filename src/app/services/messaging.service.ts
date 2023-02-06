import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageSubject = new BehaviorSubject<MessageModel>(new MessageModel());
  message = this.messageSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading = this.loadingSubject.asObservable();

  constructor() { }

  setMessage(msg: MessageModel) {
    this.messageSubject.next(msg);
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }
}

export class MessageModel {
  public type: messageCodes | null;
  public message: string | null;

  constructor(type: messageCodes|null = null,
    message: string|null = null) {
      this.type = type;
      this.message = message
    }
}

export enum messageCodes{
  ERROR,
  WARN,
  SUCCESS
}
