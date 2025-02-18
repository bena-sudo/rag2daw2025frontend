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
  comentario = '';
  nombreFichero = '';
  estado = 'PENDIENTE';
  file: File | null = null; // Ahora puede ser null
  intentoSubida = false;
  createForm: FormGroup;

  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm = this.formBuilder.group({
      file: [null, Validators.required],
      nombreFichero: ['', Validators.required],
      comentario: ['']
    });
  }

  subir() {
    this.intentoSubida = true;

    if (!this.file || !this.createForm.get('nombreFichero')?.value) {
      console.error('Debe seleccionar un archivo y proporcionar un nombre de fichero.');
      return;
    }

    // Crea el objeto FormData
    const formData = new FormData();
    // Los nombres deben coincidir con los atributos de DocumentoNew
    formData.append('nombreFichero', this.createForm.get('nombreFichero')?.value);
    formData.append('comentario', this.createForm.get('comentario')?.value);
    // Adjunta el archivo con la clave 'multipart'
    formData.append('multipart', this.file, this.file.name);
    //estado por defecto 'PENDIENTE'
    formData.append('estado','PENDIENTE');
    // Si el backend requiere otros campos (por ejemplo, idUsuario), agrégalos:
    formData.append('idUsuario', '1'); // Ejemplo; reemplaza según corresponda

    // Antes de enviar la petición
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    this.documentoService.subirDocumento(formData).subscribe({
      next: response => console.log('✅ Documento creado exitosamente:', response),
      error: error => console.error('❌ Error al crear documento:', error)
    });
  }

  get fileValid() {
    return (
      this.createForm.get('file')?.valid &&
      this.createForm.get('file')?.touched
    );
  }

  get nombreFicheroValid() {
    const control = this.createForm.get('nombreFichero');
    return control?.touched && !control.valid;
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
    if (!file) return; // Evita archivos vacíos
    this.file = file;
    this.createForm.patchValue({ file: file });
    this.createForm.get('file')?.updateValueAndValidity();
    this.createForm.get('file')?.markAsTouched();

    const dropText = document.getElementById('drop-text');
    if (dropText) {
      dropText.innerText = file.name;
    }
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
