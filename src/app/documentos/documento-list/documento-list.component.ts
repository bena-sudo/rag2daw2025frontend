import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { RouterModule } from '@angular/router';
import { DocumentosService } from '../../services/documentos.service';
import { AcreditacionesService } from '../../services/acreditaciones.service';

@Component({
  selector: 'app-documento-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './documento-list.component.html',
  styleUrl: './documento-list.component.css'
})
export class DocumentoListComponent {

  //@Input('id') idAcreditacion?: string;

  existenDocumentos = false;
  
  documentosArray: any[] = [];

  acreditacion: any;
  
  constructor(
    private documentoService: DocumentosService, private acreditacionesService: AcreditacionesService) {}
  
  ngOnInit() {
      //console.log("ID : " + this.idAcreditacion);
      //this.acreditacion = this.acreditacionesService.getAcreditacion(Number(this.idAcreditacion)).subscribe();

      // this.documentoService.searchDocumentos(this.acreditacion.id_usuario).subscribe(documentos => {
      //   console.log('Respuesta de la API:', documentos);
      //   this.documentosArray = documentos;
      //   if (this.documentosArray.length > 0) {
      //     this.existenDocumentos = true;
      //   }
      // });

      this.documentoService.searchDocumentos('1').subscribe(documentos => {
        console.log('Respuesta de la API:', documentos);
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
          const dataUrl = `data:${documento.contentTypeDocumento};base64,${base64Documento}`;
    
          const viewerWindow = window.open('', '_blank');
    
          if (viewerWindow) {
            viewerWindow.document.write('<html><body>');
            viewerWindow.document.write('<embed width="100%" height="100%" src="' + dataUrl + '" type="' + documento.contentTypeDocumento + '" />');
            viewerWindow.document.write('</body></html>');
          } else {
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
          const byteCharacters = atob(base64Documento);
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
    
          const blob = new Blob(byteArrays, { type: documento.contentTypeDocumento });
    
          saveAs(blob, documento.nombreFichero + '.' + documento.extensionDocumento);
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
