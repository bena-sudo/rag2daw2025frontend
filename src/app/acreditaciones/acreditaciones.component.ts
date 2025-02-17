import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcreditacionesService } from '../services/acreditaciones.service';
import { Observable } from 'rxjs';
import { FiltroResponse } from './modulos-response.model';

@Component({
  selector: 'app-acreditaciones',
  imports: [CommonModule, RouterModule],
  templateUrl: './acreditaciones.component.html',
  styleUrl: './acreditaciones.component.css'
})
export class AcreditacionesComponent {

  mensajesArray: any[] = []; 
  modulosArray: any[] = []; 
  acreditacionesArray: any[] = []; 
  usuariosArray: any[] = []; 
  constructor(private acreditacionesService: AcreditacionesService) {}

  ngOnInit() {
    this.acreditacionesService.getModulos().subscribe(modulos => {
      this.modulosArray = modulos.content;
      console.log(this.modulosArray);
      
    });

    this.acreditacionesService.getUsuarios().subscribe(usuarios => {
      this.usuariosArray = usuarios.content;
    });

    this.acreditacionesService.getAcreditaciones().subscribe(acreditaciones => {
      this.acreditacionesArray = acreditaciones.content;
      console.log(this.acreditacionesArray);
    });

    this.acreditacionesService.getMensajes().subscribe(mensajes => {
      this.mensajesArray =  mensajes.content; 
      console.log(this.mensajesArray);
      
    });
  }


  asignarAcreditacion(idAcreditacion: number, usuario_id: number, modulo_id: number) {
    const estadoActualizado = {
      id: idAcreditacion,
      estado: "pendiente",
      usuario_id: usuario_id,
      modulo_id: modulo_id,
      asesor_id: 1
    };
  
    this.acreditacionesService.updateEstadoAcreditacion(idAcreditacion, estadoActualizado).subscribe(response => {
      console.log('Actualización exitosa:', response);
      
      // Actualizar el array de acreditaciones localmente
      const index = this.acreditacionesArray.findIndex(a => a.id === idAcreditacion);
      if (index !== -1) {
        this.acreditacionesArray[index] = { ...this.acreditacionesArray[index], ...estadoActualizado };
      }
  
    }, error => {
      console.error('Error en la actualización:', error);
    });
  }

}