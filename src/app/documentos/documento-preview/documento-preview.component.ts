import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documento-preview',
  imports: [],
  templateUrl: './documento-preview.component.html',
  styleUrl: './documento-preview.component.css',
})
export class DocumentoPreviewComponent implements OnInit {
  documento!: Documento;
  public PDFbase64: SafeResourceUrl = '';

  constructor(
    private readonly documentosService: DocumentosService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.documentosService.getDocumento(12).subscribe({
      next: (data) => {
        this.documento = data;
      },
      error: (err) => {
        console.error('Error fetching etiquetas:', err);
      },
    });
  }

  loadPDFBase64blob() {
    this.PDFbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.documentosService.getPDFBase64blob(this.documento)
    );
  }
}
