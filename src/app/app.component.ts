import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./componentes_global/footer/footer.component";
import { HeaderComponent } from "./componentes_global/header/header.component";
import { EtiquetaGridComponent } from "./etiqueta/etiqueta-grid/etiqueta-grid.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, EtiquetaGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rag2daw2025frontend';
}
