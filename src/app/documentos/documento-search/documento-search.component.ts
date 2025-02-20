import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Etiqueta } from '../../interface/etiqueta';
import { EtiquetasService } from '../../service/etiquetas.service';

@Component({
  selector: 'app-documento-search',
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './documento-search.component.html',
  styleUrl: './documento-search.component.css',
})
export class DocumentoSearchComponent implements OnInit{
  etiquetas: Etiqueta[] = [];
  isLoading: boolean = false;
  filterForm: FormGroup;

  // Emitimos el filtro para que el componente padre lo reciba
  @Output() filtroAplicado = new EventEmitter<any>();

  constructor(private readonly fb: FormBuilder,private readonly etiquetaService: EtiquetasService)  {
    this.filterForm = this.fb.group({
      nombre: [''],
      estado: [''],
      etiqueta: [''],
      fechaCreacion: [''],
      fechaModificacion: [''],
    });
  }
  
  ngOnInit() {
    this.cargarEtiquetas();
  }


  aplicarFiltro() {
    
    const filtro = this.filterForm.value;
    this.filtroAplicado.emit(filtro);
    
  }

  cargarEtiquetas() {
    this.isLoading = true;
    this.etiquetaService.getEtiquetas().subscribe({
      next: (data) => {
        this.etiquetas = data.content;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching etiquetas:', err);
        this.isLoading = false;
      },
    });
  }
}