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

      const isAuthenticated = this.userService.isAuthenticated();
      const path = route.url[0].path;
      if(isAuthenticated) {
        if(path == 'login' || path == 'register') {
          this.router.navigate(['/dashboard']);
          return false;
        }
        else {
          return true;
        }
      }
      else {
        if(path == 'login' || path == 'register') {          
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
