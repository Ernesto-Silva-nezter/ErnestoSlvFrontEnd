import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

    canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        // El usuario no ha iniciado sesión, redirigimos a la página de inicio de sesión.
        this.router.navigateByUrl('/login');
        return false;
      }
    }

}
