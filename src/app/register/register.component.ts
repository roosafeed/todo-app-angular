import { Component } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userObj: User;

  constructor() {
    this.userObj = new User();
  }

  register():void {
    if(this.userObj.username == null || this.userObj.password == null ||
      this.userObj.username.length == 0 || this.userObj.password.length == 0) {
        console.log("username/password cannot be empty");
        return;
      }

    console.log(this.userObj);
  }
}
