import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.count3Seconds().then(
      () => console.log('termino'))
      .catch( error => console.log('error', error));
  }

  ngOnInit() {

  }

  count3Seconds(): Promise<boolean> {

    return new Promise(( resolve, reject ) => {

      let cont = 0;
      const int = setInterval ( () => {
        cont++;
        console.log( cont );

        if ( cont === 3 ) {
          resolve();
          clearInterval( int );
        }
      }, 1000 );
    });
  }

}
