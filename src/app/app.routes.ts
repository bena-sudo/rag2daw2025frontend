import { Routes } from '@angular/router';
import { LoginComponent } from './componentes_log/login/login.component';
import { RegistroComponent } from './componentes_log/registro/registro.component';
import { InicioComponent } from './componentes_log/inicio/inicio.component';
import { authGuard } from './componentes_log/guards/auth.guard';
import { ListadoUsuariosComponent } from './componentes_admin/listado-usuarios/listado-usuarios.component';
import { adminGuardsGuard } from './componentes_admin/guards/admin-guards.guard';
import { HomeComponent } from './componentes_admin/home/home.component';
import { CrearUsuarioComponent } from './componentes_admin/crear-usuario/crear-usuario.component';
import { InformacionUsuarioComponent } from './componentes_admin/informacion-usuario/informacion-usuario.component';

import { ModificarUserComponent } from './componentes_admin/modificar-user/modificar-user.component';
import { CuentasBlockComponent } from './componentes_admin/cuentas-block/cuentas-block.component';
import { ListaUsuariosActivosComponent } from './componentes_admin/lista-usuarios-activos/lista-usuarios-activos.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent},
    { path: 'login', canActivate: [authGuard], component: LoginComponent},
    { path: 'registro', canActivate: [authGuard], component: RegistroComponent},
    { path: 'home', canActivate: [adminGuardsGuard], component: HomeComponent},
    { path: 'users-list', canActivate: [adminGuardsGuard], component: ListadoUsuariosComponent},
    { path: 'usuarios-activos', canActivate: [adminGuardsGuard], component: ListaUsuariosActivosComponent},
    { path: 'users-list-block', canActivate: [adminGuardsGuard], component: CuentasBlockComponent},
    { path: 'crear-usuario', canActivate: [adminGuardsGuard], component: CrearUsuarioComponent},
    { path: 'users-list/modificar/:id', canActivate: [adminGuardsGuard], component: ModificarUserComponent},
    { path: 'infoUser/:id', canActivate: [adminGuardsGuard], component: InformacionUsuarioComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
