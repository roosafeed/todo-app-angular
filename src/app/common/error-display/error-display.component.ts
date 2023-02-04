import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { messageCodes, MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  errorMsg: string|null = "";
  isVisible: boolean = false;
  codeClass: string = "";

  constructor(private messageService: MessagingService,
    private router: Router) {}
  
  ngOnInit() {
    this.messageService.message.subscribe(msg => {
      this.errorMsg = msg.message;
      this.isVisible = true;
      switch(msg.type) {
        case messageCodes.ERROR: this.codeClass = "msg-error"; break;
        case messageCodes.SUCCESS: this.codeClass = "msg-success"; break;
        case messageCodes.WARN: this.codeClass = "msg-warn"; break;
      }
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
    this.codeClass = "";

  }
}
