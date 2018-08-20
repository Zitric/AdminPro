import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { UserService } from '../service.index';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public userService: UserService,
               public router: Router ) {}

  canActivate() {

    if ( this.userService.isLogin() ) {
      console.log('passed through the login guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('blocked by the guard');
      return false;
    }
  }


}
