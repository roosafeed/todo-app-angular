import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
constructor(private userService: UserService, 
  private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      let isAuthenticated = this.userService.isAuthenticated();
      if(isAuthenticated) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
