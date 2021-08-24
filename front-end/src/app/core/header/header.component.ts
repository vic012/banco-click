import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from './../user-auth/user-auth';
import { UserAuthService } from './../user-auth/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userAuth!: UserAuth | null;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userAuthService.getUserAuth()
      .subscribe(userAuth => {
        this.userAuth = userAuth;
      });
  }

  logout(): void {
    this.userAuthService.logout();
    this.router.navigate(['']);
  }

}
