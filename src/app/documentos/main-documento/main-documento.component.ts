import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';
import { DocumentoItemComponent } from '../documento-item/documento-item.component';
import { DocumentoSearchComponent } from '../documento-search/documento-search.component';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-documento',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DocumentoItemComponent,
    DocumentoSearchComponent,
    PaginacionComponent,
    RouterLink
  ],
  templateUrl: './main-documento.component.html',
  styleUrl: './main-documento.component.css',
})
export class MainDocumentoComponent implements OnInit {
  searchForm!: FormGroup;
  documentos: Documento[] = [];
  paginas: number = 0;
  pagina: number = 0;

  constructor(
    private readonly documentosService: DocumentosService,
    private readonly formBuilder: FormBuilder
  ) {
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
    console.log(this.pagina);
    
    this.documentosService.getDocumentos(this.pagina).subscribe({
      next: (data) => {
        this.paginas = data.totalPages;
        this.documentos = data.content;
        console.log(this.documentos);
        
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

  obtenerDatosFiltrados(filtro: any) {
    // Llamar al servicio para obtener los datos filtrados
      this.documentosService.searchDocumentos(filtro).subscribe({
      next: (documentos) => {
        if (filtro.etiqueta) {
          this.documentos = documentos.filter(doc =>
            doc.etiquetas.some(etiqueta => etiqueta.nombre === filtro.etiqueta))
        }else{
          this.documentos = documentos;
        }
      },
      error: (err) => {
        console.error('Error fetching etiquetas:', err);
      },
    });
  }

  updatePagina(valor: number) {
    this.pagina = valor - 1;
    this.cargarDocumentos();
  }
}
