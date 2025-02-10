import { Component } from '@angular/core';
import { Etiqueta } from '../../interface/etiqueta';
import { EtiquetasService } from '../../service/etiquetas.service';
import { EtiquetaCardComponent } from '../etiqueta-card/etiqueta-card.component';

@Component({
  selector: 'app-etiqueta-grid',
  imports: [EtiquetaCardComponent],
  templateUrl: './etiqueta-grid.component.html',
  styleUrl: './etiqueta-grid.component.css'
})
export class EtiquetaGridComponent {
  etiquetas: Etiqueta[] = [];

  constructor(private readonly etiquetaService: EtiquetasService) {}

  ngOnInit() {
    this.etiquetaService.getEtiquetas().subscribe((data) => {
      console.log(data);
      this.etiquetas = data.content;
    });
  }
}