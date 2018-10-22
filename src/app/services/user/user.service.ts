import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICES } from '../../config/config';
import { UploadFileService } from '../upload-file/upload-file.service';

import 'rxjs-compat/add/operator/map';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public uploadFileService: UploadFileService ) {
    this.loadStorage();
  }

  saveStorage( id: string, token: string, user: User ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', JSON.stringify( user ));
    this.user = user;
    this.token = token;
  }

  loadStorage() {
    if ( localStorage.getItem('token' )) {
      this.token = localStorage.getItem( 'token' );
      this.user = JSON.parse( localStorage.getItem( 'user' ));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isLogin() {
    return  this.token.length > 0;
  }

  login( email: string, password: string, rememberme: boolean = false ) {

    const url = URL_SERVICES + '/login';

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

    const url = URL_SERVICES + '/login/google';

    return this.http.post( url, { token } )
      .map( ( res: any ) => {
        this.saveStorage(res.id, res.token, res.user);
        return true;
    });

  }

  createUser( user: User ) {

    const url = URL_SERVICES + '/users';

    return this.http.post( url, user )
      .map( ( res: any ) => {
        swal( 'User created', user.email, 'success' );
        return res.user;
      });
  }

  updateUser( user: User ) {

    const url = URL_SERVICES + '/users/' + user._id;

    const headers = new HttpHeaders({
      'token': this.token
    });

    return this.http.put( url, user, { headers })
      .map( ( res: any ) => {
        this.saveStorage( res.user._id, this.token, res.user );
        swal( 'User updated', user.name, 'success' );
        return true;
      });
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );
    localStorage.removeItem( 'id' );
    this.router.navigate([ '/login' ]);
  }

  changeImage( file: File, id: string ) {

    this.uploadFileService.uploadFile( file, 'users', id )
      .then(  ( res: any ) => {
        console.log( 'res from then', res );
        this.user.img = res.user.img;
        swal( 'Image updated', this.user.name, 'success');
        this.saveStorage( id, this.token, this.user );
      })
      .catch( res => {
        console.log( 'res from catch', res );
      });

  }
}
