import { Component } from '@angular/core';
import { DocumentosService } from '../../service/documentos.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EtiquetasService } from '../../service/etiquetas.service';

@Component({
  selector: 'app-documento-create-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-form-documento.component.html',
  styleUrl: './create-form-documento.component.css',
})
export class CreateFormDocumentoComponent {
  usuarioId = 1;
  comentario = '';
  nombreFichero = '';
  estado = 'PENDIENTE';
  file: File | null = null; // Ahora puede ser null
  intentoSubida = false;
  createForm: FormGroup;
  etiquetasDisponibles: any[] = [];
  documentoId!: number;

  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
    private etiquetasService: EtiquetasService,
    private router: Router
  ) {
    this.createForm = this.formBuilder.group({
      file: [null, Validators.required],
      nombreFichero: ['', Validators.required],
      comentario: [''],
      etiquetas: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.cargarEtiquetas();
  }

  cargarEtiquetas() {
    this.etiquetasService.getEtiquetas().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.content)) {
          this.etiquetasDisponibles = response.content;
        } else {
          console.error('❌ Respuesta inesperada:', response);
        }
      },
      error: (error) => console.error('❌ Error al cargar etiquetas:', error),
    });
  }

  subir() {
    this.intentoSubida = true;

    if (!this.file || !this.createForm.get('nombreFichero')?.value) {
      console.error(
        'Debe seleccionar un archivo y proporcionar un nombre de fichero.'
      );
      return;
    }

    // Crea el objeto FormData
    const formData = new FormData();
    formData.append(
      'nombreFichero',
      this.createForm.get('nombreFichero')?.value
    );
    formData.append('comentario', this.createForm.get('comentario')?.value);
    formData.append('multipart', this.file, this.file.name);
    formData.append('estado', 'PENDIENTE');
    formData.append('idUsuario', this.usuarioId.toString());

    this.etiquetasArray.value.forEach((etiqueta: string) => {
      formData.append('etiquetas', etiqueta);
    });

    this.documentoService.subirDocumento(formData).subscribe({
      next: (response) => {
        // Asignar el ID del documento recibido en la respuesta
        if (response && response.id) {
          this.documentoId = response.id;
          this.router.navigate(['/documento', this.documentoId]);
        } else {
          console.warn('No se recibió un ID en la respuesta del servidor.');
        }
      },
      error: (error) => {
        console.error('❌ Error al crear documento:', error);
        this.router.navigate(['/createForm']);
      },
    });
  }

  get fileValid() {
    return (
      this.createForm.get('file')?.valid && this.createForm.get('file')?.touched
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
    document.getElementById('drop-text')!.innerText =
      'Arrastra y suelta un archivo aquí o haz clic para seleccionar';
  }

  triggerFileInput() {
    document.getElementById('file')?.click();
  }

  // INPUT ETIQUETAS

  get etiquetasArray(): FormArray {
    return this.createForm.get('etiquetas') as FormArray;
  }

  getEtiquetaControl(): FormControl {
    const control = this.formBuilder.control('');
    control.setValidators(Validators.required);
    return control;
  }

  addEtiqueta() {
    this.etiquetasArray.push(this.getEtiquetaControl());
  }

  delEtiqueta(i: number) {
    this.etiquetasArray.removeAt(i);
  }

  enviarDocumento() {
    this.intentoSubida = true;

    if (!this.file || !this.createForm.get('nombreFichero')?.value) {
      console.error(
        'Debe seleccionar un archivo y proporcionar un nombre de fichero.'
      );
      return;
    }

    // Crea el objeto FormData
    const formData = new FormData();
    formData.append(
      'nombreFichero',
      this.createForm.get('nombreFichero')?.value
    );
    formData.append('comentario', this.createForm.get('comentario')?.value);
    formData.append('multipart', this.file, this.file.name);
    formData.append('estado', 'PENDIENTE');
    formData.append('idUsuario', this.usuarioId.toString());

    this.etiquetasArray.value.forEach((etiqueta: string) => {
      formData.append('etiquetas', etiqueta);
    });

    this.documentoService.subirDocumento(formData).subscribe({
      next: (response) => {
        // Asignar el ID del documento recibido en la respuesta
        if (response && response.id) {
          this.documentoId = response.id;
          if (!this.documentoId) {
            console.error('No se ha especificado un documentoID');
            return;
          }
          this.documentoService.enviarDocumento(this.documentoId).subscribe({
            next: (chunks) => {
              this.router.navigate(['/documento', this.documentoId]);
            },
            error: (err) => console.error('Error al enviar el documento:', err),
          });
        } else {
          console.warn('No se recibió un ID en la respuesta del servidor.');
        }
      },
      error: (error) => {
        console.error('❌ Error al crear documento:', error);
        this.router.navigate(['/createForm']);
      },
    });
  }
}
