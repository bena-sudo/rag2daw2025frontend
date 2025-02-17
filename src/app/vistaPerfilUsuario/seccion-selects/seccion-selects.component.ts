import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-seccion-selects',
  imports: [CommonModule, FormsModule],
  templateUrl: './seccion-selects.component.html',
  styleUrl: './seccion-selects.component.css'
})
export class SeccionSelectsComponent {
  sectores = ['Sector 1', 'Sector 2', 'Sector 3'];
  niveles = ['Nivel 1', 'Nivel 2', 'Nivel 3'];
  modulos = ['Módulo 1', 'Módulo 2', 'Módulo 3'];
  unidadesCompetencia = ['Unidad 1', 'Unidad 2', 'Unidad 3'];

  sector: string = '';
  nivel: string = '';
  modulo: string = '';
  unidadCompetencia: string = '';
}
