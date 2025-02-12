import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { EtiquetasListComponent } from '../etiquetas-list/etiquetas-list.component';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';
import { DocumentoItemComponent } from "../documento-item/documento-item.component";
import { DocumentoSearchComponent } from "../documento-search/documento-search.component";

@Component({
  selector: 'app-main-documento',
  imports: [ReactiveFormsModule, CommonModule, EtiquetasListComponent, DocumentoItemComponent, DocumentoSearchComponent],
  templateUrl: './main-documento.component.html',
  styleUrl: './main-documento.component.css',
})
export class MainDocumentoComponent implements OnInit {
  searchForm!: FormGroup;
  documentos: Documento[] = [];

  constructor(
    private readonly documentosService: DocumentosService,
    private readonly formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm
      .get('searchInput')
      ?.valueChanges.pipe(
        debounceTime(1000) // Espera 1 segundo tras el último cambio
      )
      .subscribe(); //SERVICE
      this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.documentosService.getDocumentos().subscribe({
      next: (data) => {
        console.log(data);
        
        this.documentos = data.content;
      },
      error: (err) => {
        console.error('Error fetching etiquetas:', err);
      },
    });
  }

  onSearch(term: string): void {
    this.documentosService.searchDocumentos(term).subscribe({
      next: (documentos) => {
        this.documentos = documentos;
      },
      error: (err) => {
        console.error('Error fetching etiquetas:', err);
      },
    });
  }
}
