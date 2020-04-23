import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationServiceService} from '../services/authentication-service.service';
import {Roles} from '../model/roles.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationServiceService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = route.data.roles;
    if (this.authenticationService.currentUserValue) {

      if (roles) {
        if (roles.indexOf(this.authenticationService.currentUserValue.role) >= 0) {
          return true;
        } else {
          return false;
        }
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
