import { Component, Input } from '@angular/core';
import { BbddService } from '../../services/BBDD.service';
import { CommonModule } from '@angular/common';
import { AcreditacionesService } from '../../services/acreditaciones.service';
import { RouterModule } from '@angular/router';
import { TablaAcreditacionesService } from '../../services/tabla_acreditaciones.service';
import { Observable } from 'rxjs';
import { IFiltros } from '../../i-filtros';

@Component({
  selector: 'app-tabla-acreditaciones',
  imports: [CommonModule, RouterModule],
  templateUrl: './tabla-acreditaciones.component.html',
  styleUrls: ['./tabla-acreditaciones.component.css']
})
export class TablaAcreditacionesComponent {
  @Input() usuario: any;

  acreditacionesBBDD: IFiltros | null = null;
  modulos: IFiltros | null = null;
  asesores: IFiltros | null = null;

  currentPage: number = 0; // Página actual
  totalPages: number = 1; // Total de páginas
  pages: number[] = [];

  constructor(private tablaAcreditacionesService: TablaAcreditacionesService) {}

  ngOnInit() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    this.loadAcreditaciones();


    // this.tablaAcreditacionesService.getAcreditaciones().subscribe(acreditaciones => {
    //   this.acreditacionesBBDD = acreditaciones;                             // BBDD
    //   if (acreditaciones && acreditaciones.content) {
    //     this.acreditacionesBBDD = acreditaciones;
  
    //     this.acreditacionesBBDD.content.forEach(acreditacion => {
    //       if (acreditacion.estado === 'aprobado') {
    //         acreditacion.claseEstado = 'aprobado';
    //       } else if (acreditacion.estado === 'rechazado') {
    //         acreditacion.claseEstado = 'rechazado';
    //       } else if (acreditacion.estado === 'pendiente') {
    //         acreditacion.claseEstado = 'pendiente';
    //       }
    //     });
    //   } else {
    //     console.log("Error: La API no devolvió datos en el formato esperado.");
    //   }
    // }, error => {
    //   console.error("Error al obtener acreditaciones:", error);
    // });
    

    this.tablaAcreditacionesService.getModulos().subscribe(modulos => {
      this.modulos = modulos;
    });

    this.tablaAcreditacionesService.getUsuarios().subscribe(usuarios => {
      this.asesores = usuarios;
    });
  }

  loadAcreditaciones (page: number = 0) {
    this.tablaAcreditacionesService.getAcreditacionesFiltrado(page, 5).subscribe(acreditaciones => {
      this.acreditacionesBBDD = acreditaciones;
      this.totalPages = acreditaciones.totalPages;

      if (acreditaciones?.content) {
        acreditaciones.content.forEach(acreditacion => {
          acreditacion.claseEstado = acreditacion.estado.toLowerCase();
        });
      } else {
        console.log("Error: La API no devolvió datos en el formato esperado.");
      }
    }, error => {
      console.error("Error al obtener acreditaciones:", error);
    });
  }

  cambiarPagina(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAcreditaciones(page);
    }
  }

  getDataObservable<T>(endpoint: string, params?: any): Observable<T> {
    return this.tablaAcreditacionesService.getDataObservable<T>(endpoint, params);
  }

  crearAcreditacion(idAcreditacion: string, moduloNombre: string, idUsuario: string, idAsesor: string, idModulo: string) {
    this.tablaAcreditacionesService.infoAcreditacion.idAcreditacion = idAcreditacion;
    this.tablaAcreditacionesService.infoAcreditacion.nombreModulo = moduloNombre;
    this.tablaAcreditacionesService.infoAcreditacion.idUsuario = idUsuario;
    this.tablaAcreditacionesService.infoAcreditacion.idAsesor = idAsesor,
    this.tablaAcreditacionesService.infoAcreditacion.idModulo = idModulo;
    this.tablaAcreditacionesService.infoAcreditacion.estado = 'Pendiente';

    this.tablaAcreditacionesService.getUsuarios().subscribe(usuariosResponse => {

      const usuarios = usuariosResponse.content;

      for (const usuario of usuarios) {
        if (usuario.idUsuario === idUsuario) {
          this.tablaAcreditacionesService.infoAcreditacion.nombreUsuario = usuario.nombre;
        }
      }

      for (const aseror of usuarios) {
        if (aseror.idUsuario === idAsesor) {
          this.tablaAcreditacionesService.infoAcreditacion.nombreAsesor = aseror.nombre;
        }
      }
    });
  }
}