import { Component } from '@angular/core';
import { HttpError } from '../models/http-error.model';
import { User } from '../models/user.model';
import { MessagingService } from '../services/messaging.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userObj: User;
  isLogginButtonDisabled: boolean = false;

  constructor(
    private messageService: MessagingService,
    private userService: UserService) {
    this.userObj = new User();
  }

  login():void {
    this.isLogginButtonDisabled = true;

    if(this.userObj.username == null || this.userObj.password == null ||
      this.userObj.username.length == 0 || this.userObj.password.length == 0) {
        this.messageService.setErrorMessage("username/password cannot be empty");
        console.log("Username and Password cannot be empty");
        this.isLogginButtonDisabled = false;
        return;
    }

    console.log(this.userObj);
    this.userService.login(this.userObj).subscribe(
      {
        next: (data) => {
          console.log(JSON.stringify(data));        
        },
        error: (err) => {
          console.log(JSON.stringify(err));
          this.messageService.setErrorMessage(err.message);
        }
      }
    ).add(() => {
      this.isLogginButtonDisabled = false;
    });
  }
}
