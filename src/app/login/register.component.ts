import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor( public userService: UserService,
               public router: Router) { }

  areEquals( field1: string, field2: string ) {
    return ( group: FormGroup ) => {

      const pass1 = group.controls[ field1 ].value;
      const pass2 = group.controls[ field2 ].value;

      if ( pass1 === pass2 ) { return null; }
      return { areEquals: true };
    };
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null,
          [ Validators.required ]),
      email: new FormControl( null,
          [ Validators.required, Validators.email ]),
      password: new FormControl( null,
        [ Validators.required ]),
      passwordConfirmed: new FormControl( null,
          [ Validators.required ]),
      conditions: new FormControl( false )
    }, { validators: this.areEquals( 'password', 'passwordConfirmed' ) });

    this.form.setValue({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      passwordConfirmed: '123456v',
      conditions: true
    });

  }

  registerUser() {

    if ( this.form.invalid ) {
      return ;
    }
    if ( !this.form.value.conditions ) {
      swal( 'Important', 'You must accept the conditions', 'warning');
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser( user )
      .subscribe( res => this.router.navigate(['/login']));
  }
}
