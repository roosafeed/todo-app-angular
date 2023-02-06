import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-verify',
  templateUrl: './user-verify.component.html',
  styleUrls: ['./user-verify.component.css']
})
export class UserVerifyComponent implements OnInit {
  verified: boolean = false;
  error: string = "";
  constructor(private route: ActivatedRoute,
    private userService: UserService) {  }
  
  
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const code = params['code'];
        this.userService.verify(code).subscribe({
          next: (val) => {
            if(parseInt(val.code) == 200) {
              this.verified = true;
            }
          },
          error: (err) => {
            this.verified = false;
            this.error = err.message;  
          }
        })
      }
    )
  }
}
