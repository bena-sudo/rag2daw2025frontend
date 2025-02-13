import { Component } from '@angular/core';
import { DocumentosService } from '../../service/documentos.service';

@Component({
  selector: 'app-documento-create-form',
  imports: [],
  templateUrl: './documento-create-form.component.html',
  styleUrl: './documento-create-form.component.css'
})
export class DocumentoCreateFormComponent {
  usuarioId = 1;
  comentario = 'Este es un documento de prueba';
  estadoDocumento = 'PENDIENTE';
  file!: File; // Se selecciona en el input

  constructor(private documentoService: DocumentosService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  subir() {
    if (!this.file) {
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
}
