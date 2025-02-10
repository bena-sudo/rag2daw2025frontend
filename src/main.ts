import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/componentes_calidad/admin-panel/admin_panel.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
