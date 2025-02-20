import { Routes } from '@angular/router';
import { AdminPanelComponent } from './componentes_calidad/chat/admin-panel/admin_panel.component';
import { EstadisticasPanelComponent } from './componentes_calidad/estadisticas/estadisticas-panel/estadisticas-panel.component';
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
import { supervisorguardGuard } from './componentes_calidad/guard/supervisorguard.guard';

import { Cuestionario1Component } from './cuestionario/cuestionario1/cuestionario1.component';
import { PerfilUsuarioComponent } from './vistaPerfilUsuario/perfil-usuario/perfil-usuario.component';
import { DocumentoUserComponent } from './documentos/documento-user/documento-user.component';
import { AcreditacionesComponent } from './acreditaciones/list-acreditaciones/acreditaciones.component';
import { DetalleAcreditacionComponent } from './acreditaciones/detalle-acreditacion/detalle-acreditacion.component';
import { TablaAcreditacionesComponent } from './vistaPerfilUsuario/tabla-acreditaciones/tabla-acreditaciones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { RegistroFakeComponent } from './registro-fake/registro-fake.component';
import { asesorGuardGuard } from './documentos/guard/asesor-guard.guard';
import { RolesListComponent } from './componentes_admin/roles-list/roles-list.component';
import { InformacionRolComponent } from './componentes_admin/informacion-rol/informacion-rol.component';

export const routes: Routes = [
    //Grupo supervisor
  { path: 'admin', canActivate: [supervisorguardGuard], component: AdminPanelComponent },
  { path: 'estadisticas', canActivate: [supervisorguardGuard], component: EstadisticasPanelComponent },
  //Grupo documental
  
  //Grupo seguretat
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
  { path: 'lista-roles', canActivate: [adminGuardsGuard], component: RolesListComponent},
    { path: 'infoRol/:id', canActivate: [adminGuardsGuard], component: InformacionRolComponent},
  
  //Grupo acreditaciones
    {path: 'cuestionario/:idCuestionario/:idUsuario', component: Cuestionario1Component },
    {path: 'documentosUser', component: DocumentoUserComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: 'acreditaciones', canActivate: [asesorGuardGuard], component: AcreditacionesComponent},
    {path: 'detalle-acreditacion/:id', canActivate: [asesorGuardGuard], component: DetalleAcreditacionComponent},
    {path: 'estadisticas/:id', canActivate: [asesorGuardGuard], component: EstadisticasComponent},

    //En caso de ruta erronea redreccion a la pagina de incio
  { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
