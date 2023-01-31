import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  errorMsg: string = "";
  isVisible: boolean = false;

  constructor(private messageService: MessagingService,
    private router: Router) {}
  
  ngOnInit() {
    this.messageService.errorMessage.subscribe(msg => {
      this.errorMsg = msg;
      this.isVisible = true;
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isVisible = false;
    })
  }

  closePopup():void {
    this.isVisible = false;
    this.errorMsg = "";
  }
}
