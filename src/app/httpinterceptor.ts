import { Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { UserService } from './services/service.index';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  token: string = '';

  constructor( public _userService: UserService ) {
    this.token = this._userService.token;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Solicitud interceptada');
    const authReq = req.clone({
      headers: req.headers.set( 'token', this.token )
    });

    return next.handle( authReq ).catch(( error, caught ) => {
      console.log('Error');
      console.log(error);
      return Observable.throw(error);
    }) as any;
  }
}
