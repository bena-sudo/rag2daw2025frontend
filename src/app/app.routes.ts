import { Routes } from '@angular/router';
import { AdminPanelComponent } from './componentes_calidad/chat/admin-panel/admin_panel.component';
import { EstadisticasPanelComponent } from './componentes_calidad/estadisticas/estadisticas-panel/estadisticas-panel.component';

export const routes: Routes = [
    { path: 'admin', component: AdminPanelComponent },
    { path: 'estadisticas', component: EstadisticasPanelComponent },
];
