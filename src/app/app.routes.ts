import { Routes } from '@angular/router';
import { LoginComponent } from './componentes_log/login/login.component';
import { RegistroComponent } from './componentes_log/registro/registro.component';
import { InicioComponent } from './componentes_log/inicio/inicio.component';
import { authGuard } from './componentes_log/guards/auth.guard';
import { ListadoUsuariosComponent } from './componentes_admin/listado-usuarios/listado-usuarios.component';
import { adminGuardsGuard } from './componentes_admin/guards/admin-guards.guard';
import { InformacionUsuarioComponent } from './componentes_admin/informacion-usuario/informacion-usuario.component';

import { ModificarUserComponent } from './componentes_admin/modificar-user/modificar-user.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent},
    { path: 'login', canActivate: [authGuard], component: LoginComponent},
    { path: 'registro', canActivate: [authGuard], component: RegistroComponent},
    { path: 'users-list', canActivate: [adminGuardsGuard], component: ListadoUsuariosComponent},
    { path: 'users-list/modificar/:id', canActivate: [adminGuardsGuard], component: ModificarUserComponent},
    { path: 'infoUser/:id', canActivate: [adminGuardsGuard], component: InformacionUsuarioComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
