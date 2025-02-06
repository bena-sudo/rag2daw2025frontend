import { Routes } from '@angular/router';
import { LoginComponent } from './componentes_log/login/login.component';
import { RegistroComponent } from './componentes_log/registro/registro.component';
import { InicioComponent } from './componentes_log/inicio/inicio.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
