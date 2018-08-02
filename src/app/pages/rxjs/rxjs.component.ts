import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObserver()
      // .pipe(
      // retry( 2 )
    // )
      .subscribe(
      num => console.log( 'Subscribe', num ),
      err => console.error( 'Error of observer', err ),
      () => console.log( 'Complete' )
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('the page is going to close');
    this.subscription.unsubscribe();
  }

  returnObserver(): Observable <any> {

    return new Observable( (observer: Subscriber <any> ) => {

      let cont = 0;

      const interval = setInterval( () => {

        cont++;

        const exit = {
          value: cont
        };

        observer.next( exit );


        // if ( cont === 3 ) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // } else if ( cont === 2 ) {
        //   // clearInterval( interval );
        //   observer.error('SOS');
        // }

      }, 1000 );

    }).pipe(
      map( res => res.value ),
      filter( ( value, index ) => {
        // console.log( 'filter', value, index );

        if ( ( value % 2 ) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
