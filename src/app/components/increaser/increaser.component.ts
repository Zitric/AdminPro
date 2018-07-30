import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() marker: string = 'Marker';
  @Input() progress: number = 50;

  @Output() updatedValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges( value: number ) {

    if ( value <= 0 ) {
      this.progress = 0;
    } else if ( value >= 100 ) {
      this.progress = 100;
    } else {
      this.progress = value;
    }

    this.txtProgress.nativeElement.value = this.progress;
    this.updatedValue.emit( this.progress );

  }

  updateValue( value: number ) {

    this.progress += value;

    if ( this.progress < 0 ) {
      this.progress = 0;
    } else if ( this.progress > 100 ) {
      this.progress = 100;
    }

    this.updatedValue.emit( this.progress );
    this.txtProgress.nativeElement.focus();
  }
}
