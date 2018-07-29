import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @Input() marker: string = 'Marker';
  @Input() progress: number = 50;

  @Output() updatedValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateValue( value: number ) {

    this.progress += value;

    if ( this.progress < 0 ) {
      this.progress = 0;
    } else if ( this.progress > 100 ) {
      this.progress = 100;
    }

    this.updatedValue.emit( this.progress );
  }
}
