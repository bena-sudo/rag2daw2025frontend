import { Component } from '@angular/core';
import { Etiqueta } from '../../interface/etiqueta';
import { EtiquetasService } from '../../service/etiquetas.service';

@Component({
  selector: 'app-etiquetas-list',
  imports: [],
  templateUrl: './etiquetas-list.component.html',
  styleUrl: './etiquetas-list.component.css',
})
export class EtiquetasListComponent {
  etiquetas: Etiqueta[] = [];
  isLoading: boolean = false;

  constructor(private readonly etiquetaService: EtiquetasService) {}

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

  cambiarEtiqueta(id: number) {
    console.log(id);
  }
}
