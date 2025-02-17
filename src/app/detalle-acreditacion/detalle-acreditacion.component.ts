import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AcreditacionesService } from '../services/acreditaciones.service';

@Component({
  selector: 'app-detalle-acreditacion',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalle-acreditacion.component.html',
  styleUrl: './detalle-acreditacion.component.css'
})
export class DetalleAcreditacionComponent {
  @Input('id') idAcreditacion?: string;
  mensajeForm: FormGroup;

  constructor(
    private acreditacionesService: AcreditacionesService,
    private formBuilder: FormBuilder
  ) {
    this.mensajeForm = this.formBuilder.group({
      contenidoMensaje: ['', [Validators.required]]
    });
  }

  enviarMensaje(idUsuario: string) {
    if (!this.idAcreditacion) {
      throw new Error('idAcreditacion no puede ser undefined');
    }

    const nuevoMensaje = {
      idMensaje: (this.acreditacionesService.mensajes.length + 1).toString(),
      contenido: this.mensajeForm.get('contenidoMensaje')?.value,
      idUsuario: idUsuario,
      idAcreditacion: this.idAcreditacion
    };



    this.acreditacionesService.mensajes.push(nuevoMensaje);
    this.mensajeForm.reset();
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

  get mensajes() {
    return this.acreditacionesService.mensajes;
  }

  get infoAcreditacion() {
    return this.acreditacionesService.infoAcreditacion;
  }
}