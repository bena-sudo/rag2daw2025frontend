import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  imports: [],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements AfterViewInit{
  @ViewChild('myChart') chartRef!: ElementRef;

  ngAfterViewInit() {
    new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['BOT', 'Denis', 'Mateo', 'Jack'],
        datasets: [{
          label: 'Media de carácteres',
          data: [25, 10, 9, 5],
          backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
        }]
      }
    });
  }
}
