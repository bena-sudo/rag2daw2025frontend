import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documento-preview',
  imports: [],
  templateUrl: './documento-preview.component.html',
  styleUrl: './documento-preview.component.css',
})
export class DocumentoPreviewComponent {
  @Input({ required: true }) PDFbase64!: SafeResourceUrl;
  @Input({ required: true }) contentTypeDocumento!: string;
}
