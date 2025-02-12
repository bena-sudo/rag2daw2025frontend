import { Routes } from '@angular/router';
import { CuestionarioFormComponent } from './cuestionario/cuestionario-form/cuestionario-form.component';
import { InicioComponent } from './cuestionario/inicio/inicio.component';
import { DocumentosComponent } from './cuestionario/documentos/documentos.component';
import { Cuestionario1Component } from './cuestionario/cuestionario1/cuestionario1.component';
import { ResultadosComponent } from './cuestionario/resultados/resultados.component';
import { PerfilUsuarioComponent } from './vistaPerfilUsuario/perfil-usuario/perfil-usuario.component';


export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'cuestionario', component: Cuestionario1Component},
    {path: 'documentos', component: DocumentosComponent},
    {path: 'resultados', component: ResultadosComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
