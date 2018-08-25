import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/service.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;

  auth2: any;

  constructor( public router: Router,
               public userService: UserService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem( 'email' ) || '';
    if ( this.email.length > 1 ) {
      this.rememberme = true;
    }

  }

  googleInit() {

    gapi.load( 'auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '1072945280741-h84h5vl5has73qgd21anp2shgehttssi.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById( 'btnGoogle'));
    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, googleUser => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.userService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard' );
    });
  }

  logIn( form: NgForm ) {

    if ( form.valid ) {

      this.userService.login( form.value.email, form.value.password, form.value.rememberme )
        .subscribe( () => this.router.navigate(['/dashboard']));

    }
  }

}
