import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { sseService } from '../../service/sse.service';


Chart.register(...registerables);

@Component({
  selector: 'app-evolucion-documentos',
  // imports: [],
  templateUrl: './evolucion-documentos.component.html',
  styleUrl: './evolucion-documentos.component.css'
})
export class EvolucionDocumentosComponent implements OnInit, OnDestroy{
  chart!: Chart;
  tiemposRevision: number[] = [];
  labels: string[] = [];
  private sseSubscription!: Subscription;

  constructor(private documentoSseService: sseService) {}

  ngOnInit() {
    this.initChart();
    this.subscribeToSse();
  }

  initChart() {
    this.chart = new Chart("estadisticaChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Documentos',  // Cambio de label para reflejar el contenido
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
          x: {
            title: {
              display: true,
              text: 'Fecha'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de documentos'
            }
          }
        }
      }
    });
  }

  subscribeToSse() {
    this.sseSubscription = this.documentoSseService.conectarSSE().subscribe((data: any[]) => {
      console.log("Datos recibidos en el componente:", data);
      // Se asume que 'data' es un array de objetos con 'date' y 'count'
      this.labels = data.map(item => item.date);
      this.tiemposRevision = data.map(item => item.count);

      console.log("Labels asignados:", this.labels);
      console.log("Datos para la gráfica:", this.tiemposRevision);

      // Actualizamos la gráfica
      this.chart.data.labels = this.labels;
      (this.chart.data.datasets[0].data as number[]) = this.tiemposRevision;
      this.chart.update();
    });
  }

  ngOnDestroy(): void {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }
}
