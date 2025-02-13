import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcreditacionesService } from '../services/acreditaciones.service';

@Component({
  selector: 'app-acreditaciones',
  imports: [CommonModule, RouterModule],
  templateUrl: './acreditaciones.component.html',
  styleUrl: './acreditaciones.component.css'
})
export class AcreditacionesComponent {

  constructor(private acreditacionesService: AcreditacionesService) {}

  asignarAcreditacion(idAcreditacion: string) {
    this.acreditaciones.forEach(element => {
      if (idAcreditacion === element.idAcreditacion) {
        element.idAsesor = '1';
        element.estado = 'Asignado';
      }
    });
  }

  crearAcreditacion(idAcreditacion: string, moduloNombre: string, idUsuario: string, idAsesor: string, idModulo: string) {
    this.acreditacionesService.infoAcreditacion.idAcreditacion = idAcreditacion;
    this.acreditacionesService.infoAcreditacion.nombreModulo = moduloNombre;
    this.acreditacionesService.infoAcreditacion.idUsuario = idUsuario;
    this.acreditacionesService.infoAcreditacion.idAsesor = idAsesor,
    this.acreditacionesService.infoAcreditacion.idModulo = idModulo;
    this.acreditacionesService.infoAcreditacion.estado = 'Pendiente';

    for (const usuario of this.usuarios) {
      if (usuario.idUsuario === idUsuario) {
        this.acreditacionesService.infoAcreditacion.nombreUsuario = usuario.nombre;
      }
    }

    for (const aseror of this.usuarios) {
      if (aseror.idUsuario === idAsesor) {
        this.acreditacionesService.infoAcreditacion.nombreAsesor = aseror.nombre;
      }

    }
  }

  get usuarios() {
    return this.acreditacionesService.usuarios;
  }

  get modulos() {
    return this.acreditacionesService.modulos;
  }

  get acreditaciones() {
    return this.acreditacionesService.acreditaciones;
  }

  get infoAcreditacion() {
    return this.acreditacionesService.infoAcreditacion;
  }
}