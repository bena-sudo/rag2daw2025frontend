import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';
import { DocumentoItemComponent } from '../documento-item/documento-item.component';
import { DocumentoSearchComponent } from '../documento-search/documento-search.component';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-main-documento',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DocumentoItemComponent,
    DocumentoSearchComponent,
    PaginacionComponent,
  ],
  templateUrl: './main-documento.component.html',
  styleUrl: './main-documento.component.css',
})
export class MainDocumentoComponent implements OnInit {
  searchForm!: FormGroup;
  documentos: Documento[] = [];
  paginas: number = 0;
  pagina: number = 0;
  filtros: any = null;

  constructor(
    private readonly documentosService: DocumentosService,
    private readonly formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.getDocumentos();
  }

  cargarDocumentos() {
    this.documentosService.getDocumentos(this.pagina).subscribe({
      next: (data) => {
        this.documentos = data.content;
        this.paginas = data.totalPages;
      },
      error: (err) => {
        console.error('Error obteniendo documentos:', err);
      },
    });
  }

  getDocumentos() {
    if (this.filtros) { 
      this.obtenerDatosFiltrados(this.filtros);
    } else {
      this.cargarDocumentos();
    }
  }

  obtenerDatosFiltrados(filtro: any) {
    this.filtros = filtro;
    this.documentosService.searchDocumentos(filtro, this.pagina).subscribe({
      next: (data) => {
        this.documentos = filtro.etiqueta 
          ? data.content.filter((doc: { etiquetas: any[]; }) => 
              doc.etiquetas.some((etiqueta) => etiqueta.nombre === filtro.etiqueta)
            )
          : data.content;
        
        this.paginas = data.totalPages;
      },
      error: (err) => {
        console.error('Error obteniendo documentos filtrados:', err);
      },
    });
  }

  updatePagina(valor: number) {
    if (valor >= 1 && valor <= this.paginas) {
      this.pagina = valor - 1;
      this.getDocumentos();
    }
  }
}
