import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate() {
    if (this.authService.isCustomer()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }

}
