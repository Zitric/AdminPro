import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService ) {}

  ngOnInit() {

    $(`.${ this._settings.settings.theme }-theme`)
      .addClass( 'working' );

    $( '.selector' ).click( function() {
      $( '.selector' ).removeClass( 'working' );
      $( this ).addClass( 'working' );
    });
  }

  updateValue( theme: string ) {
    this._settings.applyTheme( theme );
  }

}
