import { Component, Input } from '@angular/core';
import { Documento } from '../../interface/documento';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-documento-item',
  imports: [RouterLink],
  templateUrl: './documento-item.component.html',
  styleUrl: './documento-item.component.css',
})
export class DocumentoItemComponent {
  @Input({ required: true }) documento!: Documento;
}
