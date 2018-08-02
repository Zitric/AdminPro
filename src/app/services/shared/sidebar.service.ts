import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'ProgressBar', url: '/progress'},
        { title: 'Graphics1', url: '/graphics1'},
        { title: 'Promises', url: '/promises'},
        { title: 'RxJs', url: '/rxjs'}
      ]
    }
  ];

  constructor() { }

}
