import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graficas-estadisticas',
  templateUrl: './graficas-estadisticas.component.html',
  styleUrls: ['./graficas-estadisticas.component.css']
})
export class GraficasEstadisticasComponent implements OnInit {
  chart!: Chart;
  tiemposRevision: number[] = [];
  labels: string[] = [];

  ngOnInit() {
    this.initChart();
    this.simulateData(); // Simula datos sin WebSocket
  }

  initChart() {
    this.chart = new Chart("estadisticaChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Tiempo de Revisión (segundos)',
            data: this.tiemposRevision,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  simulateData() {
    setInterval(() => {
      const newTime = Math.floor(Math.random() * 300);
      const newLabel = new Date().toLocaleTimeString();

      this.labels.push(newLabel);
      this.tiemposRevision.push(newTime);

      if (this.labels.length > 10) {
        this.labels.shift();
        this.tiemposRevision.shift();
      }

      this.chart.update();
    }, 2000);
  }
}
