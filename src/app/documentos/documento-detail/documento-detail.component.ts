import { Component, Input, OnInit } from '@angular/core';
import { DocumentoPreviewComponent } from '../documento-preview/documento-preview.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Documento } from '../../interface/documento';
import { DocumentosService } from '../../service/documentos.service';
import { ChunksComponent } from '../../chunks/chunks/chunks.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-documento-detail',
  imports: [DocumentoPreviewComponent, ChunksComponent,RouterLink],
  templateUrl: './documento-detail.component.html',
  styleUrl: './documento-detail.component.css',
})
export class DocumentoDetailComponent implements OnInit {
  @Input({ required: true }) id!: number;
  PDFbase64!: SafeResourceUrl;
  
  documento!: Documento;

  constructor(
    private readonly documentosService: DocumentosService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDocumento();
  }

  cargarDocumento() {
    this.documentosService.getDocumento(this.id).subscribe({
      next: (data) => {
        this.documento = data;
        this.loadPDFBase64blob();
      },
      error: (err) => {
        console.error('Error fetching documento:', err);
      },
    });
  }

  loadPDFBase64blob() {
    this.PDFbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.documentosService.getPDFBase64blob(this.documento)
    );
  }

  eliminarDocumento(){
    if (!this.documento.id) {
      console.error('Error: ID del documento es null o undefined.');
      return;
    }

    this.documentosService.deleteDocumento(this.documento.id).subscribe({
      next: () => {
        this.router.navigate(['/documentos']);
      },
      error: (err) => console.error('Error al eliminar el documento:', err),
      complete: () => console.log('Operación de eliminación completada'),
    });
  }


  
}
