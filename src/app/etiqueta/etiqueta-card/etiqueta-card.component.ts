import { Component, Input } from '@angular/core';
import { EtiquetasService } from '../../service/etiquetas.service';
import { Etiqueta } from '../../interface/etiqueta';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-etiqueta-card',

  imports: [ReactiveFormsModule],
  templateUrl: './etiqueta-card.component.html',
  styleUrl: './etiqueta-card.component.css',
})
export class EtiquetaCardComponent {
  @Input({ required: true }) etiqueta!: Etiqueta;

  mostrarModal: boolean = false;
  formEtiqueta: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly etiquetaService: EtiquetasService
  ) {
    this.formEtiqueta = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });
  }

  eliminarEtiqueta() {
    if (!this.etiqueta.id) {
      console.error('Error: ID de la etiqueta es null o undefined.');
      return;
    }

    this.etiquetaService.deleteEtiqueta(this.etiqueta.id).subscribe({
      next: () => {
        console.log('Etiqueta eliminada correctamente');
        window.location.reload();
      },
      error: (err) => console.error('Error al eliminar la etiqueta:', err),
      complete: () => console.log('Operación de eliminación completada'),
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarCambios() {
    this.formEtiqueta.patchValue({
      id: this.etiqueta.id,
    });
    this.etiquetaService
      .updateEtiqueta({ ...this.formEtiqueta.value })
      .subscribe({
        next: () => {
          this.cerrarModal();
          window.location.reload();
        },
        error: (err) => console.error('Error al actualizar la etiqueta:', err),
      });
  }
}
