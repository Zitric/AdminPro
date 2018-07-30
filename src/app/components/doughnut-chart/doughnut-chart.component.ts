import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() graphic: any = {};

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = '';
  public doughnutChartLeyend: string = '';

  constructor() { }

  ngOnInit() {

    this.doughnutChartLabels = this.graphic.labels;
    this.doughnutChartData = this.graphic.data;
    this.doughnutChartType = this.graphic.type;
    this.doughnutChartLeyend = this.graphic.leyend;
  }

}
