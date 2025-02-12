import { Routes } from '@angular/router';
import { MainDocumentoComponent } from './documentos/main-documento/main-documento.component';
import { ChunksComponent } from './chunks/chunks/chunks.component';
import { EtiquetaGridComponent } from './etiqueta/etiqueta-grid/etiqueta-grid.component';

export const routes: Routes = [

    {path: '', component: MainDocumentoComponent},
    {path: 'chunks', component: ChunksComponent},
    {path: 'etiqueta', component: EtiquetaGridComponent},
];
