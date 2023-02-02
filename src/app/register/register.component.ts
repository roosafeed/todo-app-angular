import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { MessagingService } from '../services/messaging.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userObj: User;

  constructor(
    private messageService: MessagingService,
    private userService: UserService
  ) {
    this.userObj = new User();
  }

  register():void {
    let isValid: boolean = true;
    Object.values(this.userObj).forEach(v => {
      isValid = isValid && (v != null && v.length != 0);
    });

    if(!isValid) {
        this.messageService.setErrorMessage("All fields are required!");
        return;
      }

    this.userService.register(this.userObj).subscribe({
      next: (data) => {
        this.messageService.setErrorMessage("Registered successfully. A verification link is sent to the email address used while registering the account");
      },
      error: (err) => {
        this.messageService.setErrorMessage(err.message);
      }
    });
  }
}
