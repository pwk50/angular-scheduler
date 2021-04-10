import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private ts: TokenService
  ) { }

  canActivate(): boolean {
    if (!!this.ts.getToken()) {
      return true;
    } else {
      this.router.navigate(['/home/signin']);
      return false;
    }
  }

}
