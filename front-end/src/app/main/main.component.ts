import { Component, OnInit } from '@angular/core';
import { User } from '../core/user/user';
import { UserAuthService } from './../core/user-auth/user-auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user!: User;

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService
      .getUserAuth()
      .subscribe(userAuth => {
        if (userAuth) {
          this.user = userAuth.user
        }
      });
  }

}
