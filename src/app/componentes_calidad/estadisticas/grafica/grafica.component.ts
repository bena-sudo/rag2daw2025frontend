import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EnviarFitrosService } from '../../chat/enviar-fitros.service';
import { Estadisticas } from './Estadisticas';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>; // Referencia al <canvas>
  public chart: any;

  constructor(private enviarFiltrosService: EnviarFitrosService) {}

  ngOnInit(): void {
    this.suscripcionStats();
  }

  suscripcionStats() {
    this.enviarFiltrosService.stats$.subscribe((objeto: Estadisticas | null) => {
      if (objeto != null) {
        let keys: any[] = [];
        let datos: any[] = [];

        // Obtener las claves y valores del objeto
        Object.keys(objeto).forEach(key => {
          keys.push(key);
          datos.push(objeto[key]);
        });

        keys = datos.map(item => item[0]);  
        let values = datos.map(item => item[1])

        console.log(keys,values);

        // Destruir el gráfico anterior si existe
        if (this.chart) {
          this.chart.destroy();
        }

        // Crear el gráfico
        this.chart = new Chart(this.chartCanvas.nativeElement, { // Usar la referencia al <canvas>
          type: 'pie',
          data: {
            labels: keys, // Etiquetas del gráfico
            datasets: [{
              label: 'Cantidad agrupada',
              data: values, // Datos del gráfico
              backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
            }]
          },
          options: {
            responsive: true, // Hacer el gráfico responsive
            maintainAspectRatio: false, // No mantener la relación de aspecto
          }
        });
      }
    });
  }
}