import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public chartOptions: ChartOptions = {
    responsive : true,
  };
  public chartData: ChartData<'bar'> = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], 
  datasets: [
    {
    data: [12, 19, 3, 5, 2, 3],
    label: 'Series A'
    }
  ]
  };
  public chartType: 'bar' ='bar';
}
