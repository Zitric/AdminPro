import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor( public userService: UserService ) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  saveForm( user: User ) {

    if ( !this.user.google ) {
      this.user.email = user.email;
    }
    this.user.name = user.name;

    this.userService.updateUser( this.user )
      .subscribe( res => console.log(res));

  }
}
