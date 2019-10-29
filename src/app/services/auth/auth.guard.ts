import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (!JSON.parse(localStorage.getItem('adminInfo'))) {
      this.router.navigate(['admin/login']);
      return false;
    }
    return true;
  }

}
