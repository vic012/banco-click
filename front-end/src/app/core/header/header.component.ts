import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from './../user-auth/user-auth';
import { UserAuthService } from './../user-auth/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userAuth!: UserAuth;

  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.userAuthService.getUserAuth()
      .subscribe(userAuth => {
        if (userAuth) {
          this.userAuth = userAuth;
        }
      });
  }

  button(): void {

  }

}
