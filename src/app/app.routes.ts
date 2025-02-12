import { Routes } from '@angular/router';
import { MainDocumentoComponent } from './documentos/main-documento/main-documento.component';
import { GraficasEstadisticasComponent } from './components/graficas-estadisticas/graficas-estadisticas.component';

export const routes: Routes = [

    {path: 'mainDocument', component: MainDocumentoComponent},

    {path: 'grafica', component: GraficasEstadisticasComponent}
];
