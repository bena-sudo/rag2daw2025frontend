import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-documento-search',
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './documento-search.component.html',
  styleUrl: './documento-search.component.css',
})
export class DocumentoSearchComponent {
  filterForm: FormGroup;

  // Emitimos el filtro para que el componente padre lo reciba
  @Output() filtroAplicado = new EventEmitter<any>();

  constructor(private readonly fb: FormBuilder) {
    this.filterForm = this.fb.group({
      nombre: [''],
      estado: [''],
      fechaCreacion: [''],
      fechaModificacion: [''],
    });
  }

  aplicarFiltro() {
    const filtro = this.filterForm.value;

    // Emitir los datos del filtro para ser utilizados en el componente padre
    this.filtroAplicado.emit(filtro);
  }
}