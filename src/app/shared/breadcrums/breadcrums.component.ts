import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  title: string;

  constructor( private router: Router,
               private titlePage: Title ) {

    this.getDataroute().subscribe( data => {
      console.log( 'data', data );
      this.title = data.title;
      this.titlePage.setTitle( this.title );
    });
  }

  ngOnInit() {
  }

  getDataroute() {

    return this.router.events.pipe(
      filter( event =>  event instanceof ActivationEnd ),
      filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event: ActivationEnd ) => event.snapshot.data )
    );

  }
}
