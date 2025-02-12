import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Etiqueta } from '../../interface/etiqueta';
import { EtiquetasService } from '../../service/etiquetas.service';
import { EtiquetaCardComponent } from '../etiqueta-card/etiqueta-card.component';
import { EtiquetaSearchComponent } from '../etiqueta-search/etiqueta-search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etiqueta-grid',
  imports: [
    ReactiveFormsModule,
    EtiquetaCardComponent,
    EtiquetaSearchComponent,
    CommonModule,
  ],
  templateUrl: './etiqueta-grid.component.html',
  styleUrl: './etiqueta-grid.component.css',
})
export class EtiquetaGridComponent {
  etiquetas: Etiqueta[] = [];
  isLoading: boolean = false;
  mostrarModal: boolean = false; // Estado del modal
  formEtiqueta: FormGroup; // Formulario para la nueva etiqueta

  constructor(
    private readonly etiquetaService: EtiquetasService,
    private readonly fb: FormBuilder
  ) {
    this.formEtiqueta = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    this.cargarEtiquetas();
  }

  /** Cargar etiquetas desde el backend */
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

  /** Mostrar modal */
  abrirModal() {
    this.mostrarModal = true;
    this.formEtiqueta.reset();
  }

  /** Cerrar modal */
  cerrarModal() {
    this.mostrarModal = false;
  }

  onSearch(term: string): void {
    this.isLoading = true;
    this.etiquetaService.searchEtiquetas(term).subscribe({
      next: (etiquetas) => {
        this.etiquetas = etiquetas;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching etiquetas:', err);
        this.isLoading = false;
      },
    });
  }

  /** Guardar nueva etiqueta */
  agregarEtiqueta() {
    if (this.formEtiqueta.invalid) return;

    const nuevaEtiqueta: Etiqueta = {
      id: null, // El backend generará el ID automáticamente
      nombre: this.formEtiqueta.value.nombre,
    };

    this.etiquetaService.createEtiqueta(nuevaEtiqueta).subscribe({
      next: (etiquetaGuardada) => {
        this.etiquetas.push(etiquetaGuardada);
        this.cerrarModal();
      },
      error: (err) => console.error('Error al crear la etiqueta:', err),
    });
  }

  get nombreNotValid(): string {
    const nombre = this.formEtiqueta.get('nombre');
    if (!nombre?.touched) return '';
    return nombre.invalid ? 'is-invalid' : 'is-valid';
  }
}
