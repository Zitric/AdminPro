import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  theme: string = '';
  // themeUrl: string = '';

  constructor( public _settings: SettingsService) {}

  ngOnInit() {
    $( '.selector' ).click( function() {

      // applying the check
      $( '.selector' ).removeClass( 'working' );
      $( this ).addClass( 'working' );

      // updating the variables
      this.theme = $( this ).attr( 'data-theme');
      // this.themeUrl = `assets/css/colors/${ this.theme }.css`;

      // changing the theme
      // $( '#theme' ).attr('href', this.themeUrl );
    });
  }

  updateValue() {
    this._settings.applyTheme( this.theme );

    // this._settings.settings.theme = this.theme;
    // this._settings.settings.themeUrl = this.themeUrl;
    // this._settings.saveSetting();
  }

}
