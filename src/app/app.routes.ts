import { Routes } from '@angular/router';
import { InicioComponent } from './cuestionario/inicio/inicio.component';
import { Cuestionario1Component } from './cuestionario/cuestionario1/cuestionario1.component';
import { PerfilUsuarioComponent } from './vistaPerfilUsuario/perfil-usuario/perfil-usuario.component';
import { DocumentoUserComponent } from './documentos/documento-user/documento-user.component';
import { AcreditacionesComponent } from './acreditaciones/list-acreditaciones/acreditaciones.component';
import { DetalleAcreditacionComponent } from './acreditaciones/detalle-acreditacion/detalle-acreditacion.component';
import { TablaAcreditacionesComponent } from './vistaPerfilUsuario/tabla-acreditaciones/tabla-acreditaciones.component';
import { RegistroFakeComponent } from './registro-fake/registro-fake.component';


export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'cuestionario/:idCuestionario/:idUsuario', component: Cuestionario1Component },
    {path: 'registro', component: RegistroFakeComponent},
    {path: 'documentosUser', component: DocumentoUserComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: 'tablaAcreditacion', component: TablaAcreditacionesComponent},
    {path: 'acreditaciones', component: AcreditacionesComponent},
    {path: 'detalle-acreditacion/:id', component: DetalleAcreditacionComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];