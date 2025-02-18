import { Component, Input } from '@angular/core';
import { BbddService } from '../../services/BBDD.service';
import { CommonModule } from '@angular/common';
import { AcreditacionesService } from '../../services/acreditaciones.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltroResponse } from '../../acreditaciones/modulos-response.model';

@Component({
  selector: 'app-tabla-acreditaciones',
  imports: [CommonModule, RouterModule],
  templateUrl: './tabla-acreditaciones.component.html',
  styleUrls: ['./tabla-acreditaciones.component.css']
})
export class TablaAcreditacionesComponent {
  @Input() usuario: any;

  acreditacionesBBDD: FiltroResponse | null = null;
  modulos: FiltroResponse | null = null;
  asesores: FiltroResponse | null = null;

  currentPage: number = 0; // Página actual
  totalPages: number = 1; // Total de páginas
  pages: number[] = [];

  constructor(private acreditacionesService: AcreditacionesService) {}

  ngOnInit() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    this.loadAcreditaciones();


    // this.acreditacionesService.getAcreditaciones().subscribe(acreditaciones => {
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
    

    this.acreditacionesService.getModulos().subscribe(modulos => {
      this.modulos = modulos;
    });

    this.acreditacionesService.getUsuarios().subscribe(usuarios => {
      this.asesores = usuarios;
    });
  }

  loadAcreditaciones (page: number = 0) {
    this.acreditacionesService.getAcreditacionesFiltrado(page, 5).subscribe(acreditaciones => {
      console.log("AQUUi : " + acreditaciones.content.map(acreditacion => acreditacion.usuario_id));
    });
    
    this.acreditacionesService.getAcreditacionesFiltrado(page, 5).subscribe(acreditaciones => {
      
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
    return this.acreditacionesService.getDataObservable<T>(endpoint, params);
  }

  crearAcreditacion(idAcreditacion: string, moduloNombre: string, idUsuario: string, idAsesor: string, idModulo: string) {
    this.acreditacionesService.infoAcreditacion.idAcreditacion = idAcreditacion;
    this.acreditacionesService.infoAcreditacion.nombreModulo = moduloNombre;
    this.acreditacionesService.infoAcreditacion.idUsuario = idUsuario;
    this.acreditacionesService.infoAcreditacion.idAsesor = idAsesor,
    this.acreditacionesService.infoAcreditacion.idModulo = idModulo;
    this.acreditacionesService.infoAcreditacion.estado = 'Pendiente';

    this.acreditacionesService.getUsuarios().subscribe(usuariosResponse => {

      const usuarios = usuariosResponse.content;

      for (const usuario of usuarios) {
        if (usuario.idUsuario === idUsuario) {
          this.acreditacionesService.infoAcreditacion.nombreUsuario = usuario.nombre;
        }
      }

      for (const aseror of usuarios) {
        if (aseror.idUsuario === idAsesor) {
          this.acreditacionesService.infoAcreditacion.nombreAsesor = aseror.nombre;
        }
      }
    });
  }
}