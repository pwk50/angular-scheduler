import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private ts: TokenService,
    private router: Router
  ) { }

  canActivate() {
    let { roles } = this.ts.getDecodedToken();
    let isAdmin = roles.findIndex(role => role === 'admin') !== -1;
    if (isAdmin) {
      return true
    } else {
      this.router.navigate(['/dashboard/list']);
      return false;
    }

  }
}
