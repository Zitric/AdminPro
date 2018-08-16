import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIES } from '../../config/config';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor( public http: HttpClient ) { }

  saveStorage( id: string, token: string, user: User ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', JSON.stringify( user ));
    this.user = user;
    this.token = token;
  }

  login( email: string, password: string, rememberme: boolean = false ) {

    const url = URL_SERVICIES + '/login';

    if ( rememberme ) {
      localStorage.setItem( 'email', email );
    } else {
      localStorage.removeItem( 'email' );
    }

    return this.http.post( url, { 'email': email, 'password':  password })
      .map( ( res: any ) => {
        this.saveStorage(res.id, res.token, res.user);
        return true;
      });

  }

  loginGoogle( token: string ) {

    const url = URL_SERVICIES + '/login/google';

    return this.http.post( url, { token } )
      .map( ( res: any ) => {
        this.saveStorage(res.id, res.token, res.user);
        return true;
    });

  }

  createUser( user: User ) {

    const url = URL_SERVICIES + '/users';

    return this.http.post( url, user )
      .map( ( res: any ) => {
        swal( 'User created', user.email, 'success' );
        return res.user;
      });
  }
}
