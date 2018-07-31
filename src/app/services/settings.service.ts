import { Injectable } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Injectable()
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor() {
    this.loadSettings();
  }


  saveSetting() {
    localStorage.setItem( 'settings', JSON.stringify( this.settings ));
    console.log('guardando en el storage');
  }

  loadSettings() {
    if ( localStorage.getItem( 'settings' )) {
      this.settings = JSON.parse( localStorage.getItem( 'settings' ));
      console.log('cargando del local storage');
    } else {
      console.log('usando valores por defecto');
    }
    this.applyTheme( this.settings.theme );
  }

  applyTheme ( theme: string ) {
    const themeUrl = `assets/css/colors/${ theme }.css`;
    $( '#theme' ).attr('href', themeUrl );

    this.settings.theme = theme;
    this.settings.themeUrl = themeUrl;
    this.saveSetting();
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
