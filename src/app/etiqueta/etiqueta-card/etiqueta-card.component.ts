import { Component, Input } from '@angular/core';
import { Etiqueta } from '../../interface/etiqueta';

@Component({
  selector: 'app-etiqueta-card',
  imports: [],
  templateUrl: './etiqueta-card.component.html',
  styleUrl: './etiqueta-card.component.css'
})
export class EtiquetaCardComponent {
  @Input({ required: true }) etiqueta!: Etiqueta;
}
