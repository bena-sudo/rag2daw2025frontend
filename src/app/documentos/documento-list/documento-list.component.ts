import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { RouterModule } from '@angular/router';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-documento-list',
  imports: [CommonModule],
  templateUrl: './documento-list.component.html',
  styleUrl: './documento-list.component.css'
})
export class DocumentoListComponent {

    usuario_id = 1;
    comentario = '';
    nombreFichero = '';
    tipo_documento = '';
    estado = 'PENDIENTE';
    file: File | null = null; // Ahora puede ser null
    intentoSubida = false;
    existenDocumentos = false;
  
    documentosArray: any[] = [];
  
    constructor(
      private documentoService: DocumentosService) {}
  
    ngOnInit() {
      this.documentoService.searchDocumentos('1').subscribe(documentos => {
        console.log('Respuesta de la API:', documentos); // Verifica la estructura de la respuesta
        this.documentosArray = documentos;
        if (this.documentosArray.length > 0) {
          this.existenDocumentos = true;
        }
      });
    }
  
    previsualizarDocumento(id: number) {
      const documento = this.documentosArray.find(doc => doc.id === id);
      console.log('Documento encontrado:', documento);
    
      if (documento) {
        const base64Documento = documento.base64Documento;
        console.log('Base64 del documento:', base64Documento);
    
        if (base64Documento) {
          // Crear una URL de tipo Data URL a partir del contenido base64
          const dataUrl = `data:${documento.contentTypeDocumento};base64,${base64Documento}`;
    
          // Intentar abrir una nueva ventana
          const viewerWindow = window.open('', '_blank');
    
          if (viewerWindow) {
            // Si la ventana se ha abierto correctamente, escribir el contenido
            viewerWindow.document.write('<html><body>');
            viewerWindow.document.write('<embed width="100%" height="100%" src="' + dataUrl + '" type="' + documento.contentTypeDocumento + '" />');
            viewerWindow.document.write('</body></html>');
          } else {
            // Si no se pudo abrir la ventana, mostrar un mensaje de advertencia
            console.error('No se pudo abrir una nueva ventana para previsualizar el documento');
          }
    
          console.log('Documento a previsualizar:', documento);
        } else {
          console.error('No se encontró contenido base64 para el documento');
        }
      } else {
        console.error('Documento no encontrado');
      }
    }
  
    descargarDocumento(id: number) {
      const documento = this.documentosArray.find(doc => doc.id === id);
      console.log('Documento encontrado:', documento);
    
      if (documento) {
        const base64Documento = documento.base64Documento;
        console.log('Base64 del documento:', base64Documento);
    
        if (base64Documento) {
          // Convertir el base64 a un Blob (el Blob es un objeto binario que representa datos)
          const byteCharacters = atob(base64Documento); // Decodificar base64 a caracteres binarios
          const byteArrays = [];
    
          for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
    
          // Crear un Blob con los datos binarios del archivo
          const blob = new Blob(byteArrays, { type: documento.contentTypeDocumento });
    
          // Usar FileSaver.js para descargar el archivo
          saveAs(blob, documento.nombreFichero + '.' + documento.extensionDocumento); // El nombre y extensión del archivo
          console.log('Documento descargado:', documento);
        } else {
          console.error('No se encontró contenido base64 para el documento');
        }
      } else {
        console.error('Documento no encontrado');
      }
    }
  
    borrarDocumento(id: number){
      this.documentoService.deleteDocumento(id).subscribe({
        next: () => {
          console.log('Documento borrado exitosamente');
          this.documentosArray = this.documentosArray.filter(doc => doc.id !== id);
          if (this.documentosArray.length === 0) {
            this.existenDocumentos = false;
          }
        },
        error: (error: any) => console.error('Error al borrar documento:', error)
      });
    }
  
    triggerFileInput() {
      document.getElementById('file')?.click();
    }
}
