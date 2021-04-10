import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { logo, dashboard, users, room, plus, signin, signout } from "../../shared/icons";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  loggedIn; // user session flag
  isAdmin; // admin user flag

  userSessionSubscription: Subscription; // subscription

  // Icons
  logo = logo;
  dashboard = dashboard;
  signin = signin;
  signout = signout;
  plus = plus;
  users = users;
  room = room;

  constructor(private ts: TokenService) { }

  loggedUsername;

  ngOnInit(): void {
    this.userSessionSubscription = this.ts.getObserver().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      let user = this.ts.getDecodedToken();
      this.loggedUsername = !!user && user.name;
      this.isAdmin = !!user && user.roles.findIndex(role => role === 'admin') !== -1;
    })
  }

  handleUserSession() {
    if (this.loggedIn) {
      // log off
      this.ts.removeToken()
    } else {
      // log in
    }
  }

  ngOnDestroy(): void {
    this.userSessionSubscription.unsubscribe();
  }

}
