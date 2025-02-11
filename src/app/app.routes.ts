import { Routes } from '@angular/router';
import { LoginComponent } from './componentes_log/login/login.component';
import { RegistroComponent } from './componentes_log/registro/registro.component';
import { InicioComponent } from './componentes_log/inicio/inicio.component';
import { authGuard } from './componentes_log/guards/auth.guard';
import { ListadoUsuariosComponent } from './componentes_admin/listado-usuarios/listado-usuarios.component';
import { adminGuardsGuard } from './componentes_admin/guards/admin-guards.guard';
import { HomeComponent } from './componentes_admin/home/home.component';
import { CrearUsuarioComponent } from './componentes_admin/crear-usuario/crear-usuario.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent},
    { path: 'login', canActivate: [authGuard], component: LoginComponent},
    { path: 'registro', canActivate: [authGuard], component: RegistroComponent},
    { path: 'users-list', canActivate: [adminGuardsGuard], component: ListadoUsuariosComponent},
    { path: 'home', canActivate: [adminGuardsGuard], component: HomeComponent},
    { path: 'crear-usuario', canActivate: [adminGuardsGuard], component: CrearUsuarioComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
