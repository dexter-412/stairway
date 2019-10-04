import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {checkForNumber, checkForYear} from "./validators/validators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterViewInit {
  public startYear: number;

  public currentYear = new Date().getFullYear();

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chartLabels: Array<string> = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];

  public chartType: string = 'line';

  public chartLegend: boolean = true;

  public chartData: Array<object> = [
    {
      data: [52,25,25,25,25,26,27],
      label: 'Dollar',
      fill: false
    }
  ];

  ngAfterViewInit() {
    this.chartData.splice(0,1);
  }

  formStartYear  = new FormGroup({
    year: new FormControl('', [Validators.required, checkForYear])
  });

  submitYear(): void {
    this.chartLabels = [];
    this.startYear = this.formStartYear.value.year
    for (let i = this.startYear; i <= this.currentYear; i++ ) {
      this.chartLabels.push(i.toString())
    }
  }

  chartDataFields  = new FormGroup({
    currencyName: new FormControl('', Validators.required),
    currencyValue: new FormControl('', [Validators.required, checkForNumber])
  });

  submitChartDataFields(): void {
    this.chartData.push({
      data: this.chartDataFields.value.currencyValue.split(','),
      label: this.chartDataFields.value.currencyName,
      fill: false
    });
    this.chartDataFields.reset();
  }

  deleteItem(index): void {
      this.chartData.splice(index,1);
  }

}
