import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {checkForNumber, checkForYear} from "./validators/validators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public startYear: number;

  public currentYear = new Date().getFullYear();

  public chartLabels: Array<string>;

  public chartData: Array<object> = [];


  myChart: any;

  formStartYear  = new FormGroup({
    year: new FormControl('', [Validators.required, checkForYear])
  });

  submitYear(): void {
    this.chartLabels = [];
    this.startYear = this.formStartYear.value.year;
    for (let i = this.startYear; i <= this.currentYear; i++ ) {
      this.chartLabels.push(i.toString())
    }

    this.generateChart();
  }

  chartDataFields  = new FormGroup({
    currencyName: new FormControl('', Validators.required),
    currencyValue: new FormControl('', [Validators.required, checkForNumber])
  });

  submitChartDataFields(): void {
    const color = this.setColor();
    this.chartData.push({
      data: this.chartDataFields.value.currencyValue.split(','),
      label: this.chartDataFields.value.currencyName,
      fill: false,
      backgroundColor: `${color}, 1)`,
      borderColor: `${color}, .7)`,
      pointBackgroundColor: `${color}, 1)`
    });
    this.myChart.update();
    this.chartDataFields.reset();
  }

  setColor(): string {
    const colorFirst = Math.floor(Math.random()*256);
    const colorSec = Math.floor(Math.random()*256);
    const colorTh = Math.floor(Math.random()*256);
    return `rgba(${colorFirst}, ${colorSec}, ${colorTh}`;
  }

  deleteItem(index): void {
      this.chartData.splice(index,1);
      this.myChart.update();
  }


  generateChart():void {
   this.myChart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets:  this.chartData
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true
      }
    });
  }
}
