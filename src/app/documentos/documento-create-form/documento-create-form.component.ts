import { Component } from '@angular/core';
import { DocumentosService } from '../../service/documentos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documento-create-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './documento-create-form.component.html',
  styleUrl: './documento-create-form.component.css'
})
export class DocumentoCreateFormComponent {
  usuarioId = 1;
  comentario = 'Este es un documento de prueba';
  estadoDocumento = 'PENDIENTE';
  file: File | null = null; // Ahora puede ser null
  createForm: FormGroup;

  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
  ) {
    // Inicializamos el control con null en lugar de '' para que sea coherente con el tipo File.
    this.createForm = this.formBuilder.group({
      file: [null, Validators.required],
    });
  }

  subir() {
    if (!this.file || !this.fileValid) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const documento = {
      idUsuario: this.usuarioId,
      comentario: this.comentario,
      estadoDocumento: this.estadoDocumento,
      nombreFichero: this.file.name,
    };

    this.documentoService.subirDocumento(documento, this.file)
      .then(observable => {
        observable.subscribe({
          next: response => console.log('Documento creado exitosamente:', response),
          error: error => console.error('Error al crear documento:', error)
        });
      })
      .catch(error => console.error('Error al convertir el archivo:', error));
  }

  get fileValid() {
    return (
      this.createForm.get('file')?.valid &&
      this.createForm.get('file')?.touched
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.actualizarArchivo(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.actualizarArchivo(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.remove('dragover');
  }

  actualizarArchivo(file: File) {
    if (!file) return; // Evitar archivos vacíos

    this.file = file;
    // Actualizamos el formulario con el archivo
    this.createForm.patchValue({ file: file });
    this.createForm.get('file')?.updateValueAndValidity();
    // Marcar el control como "touched" para que fileValid retorne true.
    this.createForm.get('file')?.markAsTouched();

    // Cambiar el texto dentro del área de arrastre
    document.getElementById('drop-text')!.innerText = file.name;
  }

  borrarArchivo() {
    this.file = null;
    this.createForm.reset(); // Resetea el formulario
    document.getElementById('drop-text')!.innerText = "Arrastra y suelta un archivo aquí o haz clic para seleccionar";
  }

  triggerFileInput() {
    document.getElementById('file')?.click();
  }
}
