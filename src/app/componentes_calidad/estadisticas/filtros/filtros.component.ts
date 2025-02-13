import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service';
import { EnviarFitrosService } from '../../chat/enviar-fitros.service';
import { IFiltroAgroupacion } from './ifiltroygroup';

@Component({
  selector: 'app-filtros',
  imports: [FormsModule, CommonModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {

  selectedGroup: string = "";

  apply: any;

  users: string[] = [];
  chunks: string[] = [];

  filtros = {
    filterUser: "",
    filterPregunta: "",
    filterRespuesta: "",
    filterChunks: "",
    filterValorado: "",
    filterFeedback: "",
  }

  fechaInicio: string = "";
  fechaFin: string = "";

  constructor(
    private apiService: ApiService,
    private enviarFiltrosService: EnviarFitrosService
  ) { };

  ngOnInit() {
    this.iniciarListaNombres();
    this.apply = document.getElementById("apply-filters");
  }


  iniciarListaNombres() {
    this.apiService.getListUsuarios().subscribe(
      list => this.users = list,
      error => console.error("Error al conseguir los usuarios: ", error)
    );
  }


  bodyFiltros: { [key: string]: any } = {};
  aplicarEstadisticas() {
    for (let [key, value] of Object.entries(this.filtros))
      if (value != "")
        this.bodyFiltros[key] = value;

    let stringFecha = `${this.fechaInicio != "" ? this.fechaInicio : "null"},${this.fechaFin != "" ? this.fechaFin : "null"}`;

    if (stringFecha != 'null,null')
      this.bodyFiltros['filterRango'] = stringFecha;


    let agrupacion = ""
    if (this.selectedGroup != "") {
        agrupacion= "?groupBy="+this.selectedGroup
    }

    let datos :IFiltroAgroupacion = {"filtros":this.bodyFiltros, "agrupacion":agrupacion} 
    

    this.apiService.getStats(datos).subscribe( data => console.log(data));
  }

}
