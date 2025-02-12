import { Component, Input } from '@angular/core';
import { BbddService } from '../../services/BBDD.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tabla-acreditaciones',
  imports: [CommonModule],
  templateUrl: './tabla-acreditaciones.component.html',
  styleUrl: './tabla-acreditaciones.component.css'
})
export class TablaAcreditacionesComponent {
  @Input() usuario: any;
  acreditaciones: any[] = [{Modulo: 'Jardinería', estado: "aprobado", fechaActualizacion: '2021-01-01'}, {Modulo: 'Carpintería', estado: "pendiente", fechaActualizacion: '2021-01-01'}, {Modulo: 'Electricidad', estado: "pendiente", fechaActualizacion: '2021-01-01'}];

  constructor(private bbddService: BbddService) { }

  ngOnInit(): void {
    /* this.cargarAcreditaciones(); */
  }
/* 
  cargarAcreditaciones(): void {
    const usuarioId = this.usuario.id;
    this.bbddService.getAcreditaciones(usuarioId).subscribe(
      (data) => {
        this.acreditaciones = data;
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    );
  } */
  
}
