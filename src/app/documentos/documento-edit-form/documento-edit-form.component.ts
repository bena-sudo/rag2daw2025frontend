import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';

@Component({
  selector: 'app-documento-edit-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './documento-edit-form.component.html',
  styleUrl: './documento-edit-form.component.css'
})
export class DocumentoEditFormComponent implements OnInit {

  @Input('id') documentoID!: string;
  editForm: FormGroup;
  documentoOriginal!: Documento;
  estado: String= '';

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentosService
  ) {
    this.editForm = this.formBuilder.group({
      nombreFichero: ['', [Validators.required]], // Campo obligatorio
      comentario: [''], // Campo opcional, sin validadores
    });
  }

  // Getter para validar el campo "nombre"
  get nombreValid() {
    const control = this.editForm.get('nombreFichero');
    return control?.touched && !control.valid;
  }

  // // Método para enviar el formulario
  // submitForm() {
  //   // Si el formulario es inválido, marcamos todos los campos como "tocados"
  //   // para que se muestren los mensajes de error al usuario
  //   if (this.editForm.invalid) {
  //     this.editForm.markAllAsTouched();
  //     console.log('Formulario no válido');
  //     return;
  //   }

  //   // Obtenemos los valores del formulario y los asignamos al modelo Documento
  //   const documento: Documento = {
  //     id: Number.parseInt(this.documentoID), // Agregar el documentoID al modelo
  //     ...this.editForm.value,
  //     estadoDocumento: 'PENDIENTE'
  //   };
  //   console.log(this.editForm.value);

  //   // Llamamos al servicio para actualizar el documento
  //   this.documentService.updateDocumento(documento).subscribe({
  //     next: (updatedDoc) => {
  //       console.log('Documento actualizado:', updatedDoc);

  //       // Reiniciar el formulario tras la actualización
  //       this.editForm.reset();
  //     },
  //     error: (err) => {
  //       console.log(this.documentoID)
  //       console.error('Error al actualizar el documento:', err);
  //     },
  //     complete: () => {
  //       console.log('Actualización completada.');
  //     },
  //   });
  // }

  submitForm() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      console.log('Formulario no válido');
      return;
    }
  
    const documento: Documento = {
      id: Number.parseInt(this.documentoID),
      ...this.editForm.value,
      estado: this.documentoOriginal.estado, // Mantener el estado original
      idUsuario: 1 //IMPLEMENTACIÓ USUARIS
    };
  
    console.log('Enviando documento actualizado:', documento);
  
    this.documentService.updateDocumento(documento).subscribe({
      next: (updatedDoc) => {
        console.log('Documento actualizado:', updatedDoc);
        this.editForm.reset();
      },
      error: (err) => console.error('Error al actualizar el documento:', err),
      complete: () => console.log('Actualización completada.'),
    });
  }
  

  ngOnInit(): void {
    this.documentService.searchDocumentoById(Number.parseInt(this.documentoID)).subscribe({
      next: (documento) => {
        console.log('Documento encontrado:', documento);
        this.documentoOriginal = documento; // Guardamos el documento original
        this.editForm.patchValue({
          nombreFichero: documento.nombreFichero,
          comentario: documento.comentario || ''
        });
      },
      error: (err) => console.error('Error al buscar el documento:', err)
    });
  }
  

}

