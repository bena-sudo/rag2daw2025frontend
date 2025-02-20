import { Component, Input } from '@angular/core';
import { InfoRoles } from '../../interface/info-roles';
import { ServiceAdminService } from '../service/service-admin.service';
import { InfoPermisos } from '../../interface/InfoPermisos';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-rol',
  imports: [CommonModule],
  templateUrl: './informacion-rol.component.html',
  styleUrl: './informacion-rol.component.css'
})
export class InformacionRolComponent {

    @Input('id') IdRol?: string;
    public permisosActivos: InfoPermisos[] = [];
    public todosLosPermisos: InfoPermisos[] = [];
    public nombreRol: string = '';
  
    constructor(private adminService: ServiceAdminService) {}
  
    ngOnInit(): void {    
      if (!this.IdRol) {
        console.error("El ID del rol es indefinido.");
        return;
      }
      this.cargarPermisos();
    }
  
    cargarPermisos() {
      this.adminService.getPermisos().subscribe({
        next: permisos => {
          this.todosLosPermisos = permisos;
          
          this.adminService.getPermisosRol(this.IdRol!).subscribe({
            next: permisosRol => {
              //console.log('Respuesta permisosRol:', permisosRol);
              this.nombreRol = permisosRol.nombre;
              this.permisosActivos = permisosRol.permisos ? permisosRol.permisos : [];
              //console.log('Permisos activos:', this.permisosActivos);
            },
            error: err => {
              console.error('Error obteniendo permisos del rol:', err);
              this.permisosActivos = [];
            }
          });
          
        },
        error: err => {
          console.error('Error obteniendo permisos:', err);
          this.todosLosPermisos = [];
        }
      });
    }
  
    esPermisoActivo(permiso: InfoPermisos): boolean {
      const permisoActivo = this.permisosActivos.find(p => p.id === permiso.id);
      return permisoActivo !== undefined; 
    }
    
  
    togglePermiso(permiso: InfoPermisos) {
      if (this.esPermisoActivo(permiso)) {
        this.permisosActivos = this.permisosActivos.filter(p => p.id !== permiso.id);
      } else {
        this.permisosActivos = [...this.permisosActivos, permiso];
      }
  
      this.actualizarPermisos();
    }
  
    actualizarPermisos() {
      const permisosAsignados = this.permisosActivos.map(p => p.id);
      this.adminService.asignarPermisosRol(this.IdRol!, permisosAsignados)
        .subscribe({
          next: () => console.log('Permisos actualizados'),
          error: err => console.error('Error actualizando permisos:', err)
        });
    }
  
    permisoId(index: number, permiso: InfoPermisos): number {
      return permiso.id;
    }
    

}