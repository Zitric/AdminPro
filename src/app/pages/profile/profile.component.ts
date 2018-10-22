import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent  {

  user: User;
  imageUpload: File;
  tempImage: string;

  constructor( public userService: UserService ) {
    this.user = this.userService.user;
  }

  saveForm( user: User ) {

    if ( !this.user.google ) {
      this.user.email = user.email;
    }
    this.user.name = user.name;

    this.userService.updateUser( this.user )
      .subscribe( res => console.log(res));

  }

  ImageSelection( file: File ) {

    if ( !file ) {
      this.imageUpload = null;
      return;
    }
    if ( file.type.indexOf( 'image' ) < 0 ) {
      swal( 'Just images', 'The file selected is not an image', 'error' );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    const reader = new FileReader();
    const urlTempImage = reader.readAsDataURL( file );

    reader.onloadend = () => this.tempImage = reader.result;

  }

  changeImage() {
    this.userService.changeImage( this.imageUpload, this.user._id );
  }
}
