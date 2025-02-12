import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentosService
  ) {
    this.editForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
    });
  }

  get nombreValid() {
    return (
      this.editForm.get('nombre')?.valid &&
      this.editForm.get('nombre')?.touched
    );
  }

  get comentarioValid() {
    return (
      this.editForm.get('comentario')?.valid &&
      this.editForm.get('comentario')?.touched
    );
  }

  submitForm() {

    if (this.editForm.invalid) {
      return;
    }
    
    const documento: Documento = this.editForm.value;

    this.documentService.updateDocumento(documento).subscribe({
      next: (updatedDoc) => {
        console.log('Documento actualizado:', updatedDoc);
      },
      complete: () => {
        console.log('Actualización completada.');
      },
      error: (err) => {
        console.error('Error al actualizar el documento:', err);
      }
    })

  }

}
