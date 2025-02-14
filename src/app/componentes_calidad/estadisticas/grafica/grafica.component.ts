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
  public graphType: string = 'pie';

  constructor(private enviarFiltrosService: EnviarFitrosService) { }

  ngOnInit(): void {
    this.suscripcionStats();
    this.suscripcionGraficaType();

  }

  suscripcionGraficaType() {
    this.enviarFiltrosService.graphType$.subscribe((tipo: string) => {
      this.graphType = tipo;
      console.log("Tipo de gráfico:", tipo);
    });
  }

  suscripcionStats() {
    this.enviarFiltrosService.stats$.subscribe((objeto: Estadisticas | null) => {
      if (objeto != null) {
        let keys: any[] = [];
        let datos: any[] = [];


        Object.keys(objeto).forEach(key => {
          keys.push(key);
          datos.push(objeto[key]);
        });

        keys = datos.map(item => item[0]);
        let values = datos.map(item => item[1])

        console.log(keys, values);


        if (this.chart) {
          this.chart.destroy();
        }


        switch (this.graphType) {
          case "pie":
            this.chart = new Chart(this.chartCanvas.nativeElement, {
              type: 'pie',
              data: {
                labels: keys,
                datasets: [{
                  label: 'Cantidad agrupada',
                  data: values,
                  backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 0.45
              }
            });
            break;
        
            case "line":




            break;



          default:
            console.log("Error recibiendo el tipo de chart");
            this.graphType = "pie"
            break;
        }


        
      }
    });
  }
}