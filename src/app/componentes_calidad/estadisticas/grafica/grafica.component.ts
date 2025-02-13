import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/service';
import { EnviarFitrosService } from '../../chat/enviar-fitros.service';
//import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  imports: [],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent/* implements AfterViewInit*/ {
  @ViewChild('myChart') chartRef!: ElementRef;
  selectedGroup: string = "";

	constructor(
		private apiService: ApiService,
		private enviarFiltrosService: EnviarFitrosService 
	) {};


  ngOnInit() {
		this.suscripcionStats();
	}

	suscripcionStats() {
		this.enviarFiltrosService.stats$.subscribe( objeto => {
			this.apiService.getStats(objeto).subscribe( 
				page => {

          console.log(page);
          
/*

					this.chartRef.nativeElement, {
            type: 'pie',
            data: {
              labels: ['BOT', 'Denis', 'Mateo', 'Jack'],
              datasets: [{
                label: 'Media de carácteres',
                data: [25, 10, 9, 5],
                backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
              }]
            }
          };*/
				
				},
				error => console.error("Error al conseguir los usuarios: ", error)
			  );
		})
	}


/*
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
  }*/
}
