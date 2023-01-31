import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userObj: User;

  constructor(private messageService: MessagingService) {
    this.userObj = new User();
  }

  login():void {
    if(this.userObj.username == null || this.userObj.password == null ||
      this.userObj.username.length == 0 || this.userObj.password.length == 0) {
        this.messageService.setErrorMessage("username/password cannot be empty");
        console.log("username/password cannot be empty");
        return;
    }

    console.log(this.userObj);
  }
}
