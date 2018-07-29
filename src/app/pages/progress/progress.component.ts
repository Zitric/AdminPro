import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  blueProgress: number = 20;
  greenProgress: number = 50;

  constructor() { }

  ngOnInit() {
  }

}
