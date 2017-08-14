import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss'],
  animations: [fadeInUp]
})
export class MainChartComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  barData: any;
  lineData: any;
  pieData: any;
  doughnutData: any;
  pageTitle = 'Components-Chart';
  chartColors: any;
  weeks: any;

  constructor() {
    this.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };
    this.weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.barData = {
      labels: this.weeks,
      datasets: [
        {
          label: 'The First Week',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'The Second Week',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.lineData = {
      labels: this.weeks,
      datasets: [
        {
          label: 'The First Week',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: this.chartColors.blue,
          borderColor: this.chartColors.blue
        },
        {
          label: 'The Second Week',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: this.chartColors.red,
          borderColor: this.chartColors.red
        }
      ]
    };

    this.pieData = {
      datasets: [{
        data: [
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
        ],
        backgroundColor: [
          this.chartColors.red,
          this.chartColors.orange,
          this.chartColors.yellow,
          this.chartColors.green,
          this.chartColors.blue,
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    };

    this.doughnutData = {
      datasets: [{
        data: [
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
        ],
        backgroundColor: [
          this.chartColors.red,
          this.chartColors.orange,
          this.chartColors.yellow,
          this.chartColors.green,
          this.chartColors.blue,
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    };
  }

  ngOnInit() {
  }

  randomScalingFactor() {
    return Math.round(Math.random() * 100);
  }
}
