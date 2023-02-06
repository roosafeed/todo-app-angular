import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { messageCodes, MessageModel, MessagingService } from '../services/messaging.service';
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
    private userService: UserService,
    private router: Router) {
    this.userObj = new User();
  }

  login():void {
    this.isLogginButtonDisabled = true;

    if(this.userObj.username == null || this.userObj.password == null ||
      this.userObj.username.length == 0 || this.userObj.password.length == 0) {
        const msg: MessageModel = new MessageModel(messageCodes.ERROR, "username/password cannot be empty");
        this.messageService.setMessage(msg);
        this.isLogginButtonDisabled = false;
        return;
    }

    this.userService.login(this.userObj).subscribe(
      {
        next: () => {      
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          const msg: MessageModel = new MessageModel(messageCodes.ERROR, err.message);
          this.messageService.setMessage(msg);
        }
      }
    ).add(() => {
      this.isLogginButtonDisabled = false;
    });
  }
}
