import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routerSubscription: Subscription | undefined;
  loadingSubscription: Subscription | undefined;
  isLoggedIn: boolean = false;
  isLoading: boolean = true;
  canGoBack: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessagingService,
    private location: Location) {
      location.onUrlChange(() => {
        this.canGoBack = !!router.getCurrentNavigation()?.previousNavigation;
      });
    }  
  
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.isLoading = true;
      }
      if(event instanceof NavigationEnd) {
          this.isLoggedIn = this.userService.isAuthenticated();  
          this.isLoading = false;        
      }
    });    

    this.loadingSubscription = this.messageService.loading.subscribe({
      next: (loading) => {
        this.isLoading = loading;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  goBack(): void {
    if(this.canGoBack) {
      this.location.back();
    }
  }
}
