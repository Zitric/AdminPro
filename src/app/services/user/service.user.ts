import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIES } from '../../config/config';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class UserService {

  constructor( public http: HttpClient ) {
    console.log('Servicio de usuario listo');
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
