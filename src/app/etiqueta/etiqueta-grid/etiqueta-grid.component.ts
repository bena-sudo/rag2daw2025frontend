import { Component } from '@angular/core';
import { Etiqueta } from '../../interface/etiqueta';
import { EtiquetasService } from '../../service/etiquetas.service';
import { EtiquetaCardComponent } from '../etiqueta-card/etiqueta-card.component';
import { EtiquetaSearchComponent } from "../etiqueta-search/etiqueta-search.component";

@Component({
  selector: 'app-etiqueta-grid',
  imports: [EtiquetaCardComponent, EtiquetaSearchComponent],
  templateUrl: './etiqueta-grid.component.html',
  styleUrl: './etiqueta-grid.component.css',
})
export class EtiquetaGridComponent {
  etiquetas: Etiqueta[] = [];
  isLoading: boolean = false;

  constructor(private readonly etiquetaService: EtiquetasService) {}

  ngOnInit() {
    this.etiquetaService.getEtiquetas().subscribe((data) => {
      this.etiquetas = data.content;
      this.isLoading = false;
    });
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

}
