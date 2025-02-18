import { Routes } from '@angular/router';
import { CuestionarioFormComponent } from './cuestionario/cuestionario-form/cuestionario-form.component';
import { InicioComponent } from './cuestionario/inicio/inicio.component';
import { DocumentosComponent } from './cuestionario/documentos/documentos.component';
import { Cuestionario1Component } from './cuestionario/cuestionario1/cuestionario1.component';
import { PerfilUsuarioComponent } from './vistaPerfilUsuario/perfil-usuario/perfil-usuario.component';
import { AcreditacionesComponent } from './acreditaciones/acreditaciones.component';
import { DetalleAcreditacionComponent } from './detalle-acreditacion/detalle-acreditacion.component';
import { TablaAcreditacionesComponent } from './vistaPerfilUsuario/tabla-acreditaciones/tabla-acreditaciones.component';


export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'cuestionario', component: Cuestionario1Component},
    {path: 'documentos', component: DocumentosComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: 'tablaAcreditacion', component: TablaAcreditacionesComponent},
    {path: 'acreditaciones', component: AcreditacionesComponent},
    {path: 'detalle-acreditacion/:id', component: DetalleAcreditacionComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
