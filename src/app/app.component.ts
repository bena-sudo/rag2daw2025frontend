import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './componentes_global/footer/footer.component';
import { HeaderComponent } from './componentes_global/header/header.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
