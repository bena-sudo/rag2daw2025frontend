import { Routes } from '@angular/router';
import { MainDocumentoComponent } from './documentos/main-documento/main-documento.component';
import { DocumentoEditFormComponent } from './documentos/documento-edit-form/documento-edit-form.component';

export const routes: Routes = [

    {path: '', component: MainDocumentoComponent},
    {path: 'formEdit', component: DocumentoEditFormComponent}
];

