import { Component, Input, OnInit } from '@angular/core';
import { EtiquetasService } from '../../service/etiquetas.service';
import { Etiqueta } from '../../interface/etiqueta';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etiqueta-card',

  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './etiqueta-card.component.html',
  styleUrl: './etiqueta-card.component.css',
})
export class EtiquetaCardComponent implements OnInit{
  @Input({ required: true }) etiqueta!: Etiqueta;

  mostrarModal: boolean = false;
  formEtiqueta!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly etiquetaService: EtiquetasService
  ) {  }

  ngOnInit(): void {
    this.formEtiqueta = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(4), this.differentFromValidator(this.etiqueta.nombre!)]],
    });
    this.formEtiqueta.get('nombre')?.setValue(this.etiqueta.nombre);
  }

  eliminarEtiqueta() {
    if (!this.etiqueta.id) {
      console.error('Error: ID de la etiqueta es null o undefined.');
      return;
    }

    this.etiquetaService.deleteEtiqueta(this.etiqueta.id).subscribe({
      next: () => {
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
    this.formEtiqueta.get('nombre')?.setValue(this.etiqueta.nombre);
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

  get nombreNotValid(): string {
    const nombre = this.formEtiqueta.get('nombre');
    if (!nombre?.touched) return '';
    return nombre.invalid ? 'is-invalid' : 'is-valid';
  }

  differentFromValidator(originalValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === originalValue) {
        return { sameAsBefore: 'El nombre no puede ser igual al anterior' };
      }
      return null;
    };
  }

  getNombreErrorMessage(): string {
    const control = this.formEtiqueta.get('nombre');
    if (control?.hasError('required')) {
      return 'El nombre es obligatorio.';
    }
    if (control?.hasError('minlength')) {
      return 'El nombre debe tener al menos 4 caracteres.';
    }
    if (control?.hasError('sameAsBefore')) {
      return 'El nombre no puede ser igual al anterior.';
    }
    return '';
  }
}
