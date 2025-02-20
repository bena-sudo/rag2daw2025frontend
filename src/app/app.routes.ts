import { Routes } from '@angular/router';
import { ChunksComponent } from './chunks/chunks/chunks.component';
import { EtiquetaGridComponent } from './etiqueta/etiqueta-grid/etiqueta-grid.component';
import { MainDocumentoComponent } from './documentos/main-documento/main-documento.component';
import { GraficasEstadisticasComponent } from './estadistica_documental/graficas-estadisticas/graficas-estadisticas.component';
import { DocumentoCreateFormComponent } from './documentos/documento-create-form/documento-create-form.component';
import { DocumentoDetailComponent } from './documentos/documento-detail/documento-detail.component';
import { DocumentoEditFormComponent } from './documentos/documento-edit-form/documento-edit-form.component';
import { EvolucionDocumentosComponent } from './estadistica_documental/evolucion-documentos/evolucion-documentos.component';

export const routes: Routes = [
  { path: '', component: MainDocumentoComponent },
  { path: 'main', component: MainDocumentoComponent },
  { path: 'chunks', component: ChunksComponent },
  { path: 'etiqueta', component: EtiquetaGridComponent },
  { path: 'documento/:id', component: DocumentoDetailComponent },
  {path: 'createForm', component: DocumentoCreateFormComponent},

  {path: 'editForm/:id', component: DocumentoEditFormComponent},
  {path: 'grafica', component: EvolucionDocumentosComponent}
  
];

