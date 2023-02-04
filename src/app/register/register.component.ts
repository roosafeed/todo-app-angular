import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { messageCodes, MessageModel, MessagingService } from '../services/messaging.service';
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
      const msg: MessageModel = new MessageModel(messageCodes.ERROR, "All fields are required!");
      this.messageService.setMessage(msg);
      return;
    }

    this.userService.register(this.userObj).subscribe({
      next: (data) => {
        const msg: MessageModel = new MessageModel(messageCodes.SUCCESS, "Registered successfully. A verification link is sent to the email address used while registering the account")
        this.messageService.setMessage(msg);
      },
      error: (err) => {
        const msg: MessageModel = new MessageModel(messageCodes.ERROR, err.message);
        this.messageService.setMessage(msg);
      }
    });
  }
}
