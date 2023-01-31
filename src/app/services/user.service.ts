import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserAuthenticated: boolean = true;

  constructor() { }

  isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
