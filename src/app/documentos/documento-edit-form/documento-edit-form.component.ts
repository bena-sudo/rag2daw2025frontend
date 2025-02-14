import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';

@Component({
  selector: 'app-documento-edit-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './documento-edit-form.component.html',
  styleUrl: './documento-edit-form.component.css'
})
export class DocumentoEditFormComponent {

  @Input('id') documentoID!: string;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentosService
  ) {
    this.editForm = this.formBuilder.group({
      nombre: ['', [Validators.required]], // Campo obligatorio
      comentario: [''], // Campo opcional, sin validadores
    });
  }

  // Getter para validar el campo "nombre"
  get nombreValid() {
    const control = this.editForm.get('nombre');
    return control?.touched && !control.valid;
  }

  // Método para enviar el formulario
  submitForm() {
    // Si el formulario es inválido, marcamos todos los campos como "tocados"
    // para que se muestren los mensajes de error al usuario
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      console.log('Formulario no válido');
      return;
    }

    // Obtenemos los valores del formulario y los asignamos al modelo Documento
    const documento: Documento = {
      id: Number.parseInt(this.documentoID), // Agregar el documentoID al modelo
      estadoDocumento: 'PENDIENTE',
      ...this.editForm.value
    };
    console.log(this.editForm.value);

    // Llamamos al servicio para actualizar el documento
    this.documentService.updateDocumento(documento).subscribe({
      next: (updatedDoc) => {
        console.log('Documento actualizado:', updatedDoc);

        // Reiniciar el formulario tras la actualización
        this.editForm.reset();
      },
      error: (err) => {
        console.log(this.documentoID)
        console.error('Error al actualizar el documento:', err);
      },
      complete: () => {
        console.log('Actualización completada.');
      },
    });
  }
}

