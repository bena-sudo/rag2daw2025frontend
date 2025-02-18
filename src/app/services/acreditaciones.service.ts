import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa el archivo de environment
import { FiltroResponse } from '../acreditaciones/list-acreditaciones/modulos-response.model';
import { MensajeResponse } from '../acreditaciones/detalle-acreditacion/mensajes-response.model';

@Injectable({
  providedIn: 'root'
})
export class AcreditacionesService {

  private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment
  
    constructor(private http: HttpClient) {}
  
    getDataObservable<T>(endpoint: string, params?: any): Observable<T> {
      return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { 
        params, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    getModulos(): Observable<FiltroResponse> {
      return this.getDataObservable<FiltroResponse>('modulos');
    }
  
    getUsuarios(): Observable<FiltroResponse> { 
      return this.getDataObservable<FiltroResponse>('usuarios');
    }

    getAcreditaciones(): Observable<FiltroResponse> { 
      return this.getDataObservable<FiltroResponse>('estadoAcreditacion');
    }

    getAcreditacionesFiltrado(page: number = 0, size: number = 5): Observable<FiltroResponse> {
      const filter = 'usuario_id:IGUAL:1';
      const fullUrl = `${this.apiUrl}/estadoAcreditacion?filter=${encodeURIComponent(filter)}&page=${page}&size=${size}`;
      
      console.log("URL generada:", fullUrl);
      
      return this.http.get<FiltroResponse>(fullUrl, { 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    getAcreditacionesUsuarioAceptadas (page: number = 0, size: number = 5): Observable<FiltroResponse> {
      const filter = 'usuario_id:IGUAL:2&estado:igual:aprobado';
      const fullUrl = `${this.apiUrl}/estadoAcreditacion?filter=${encodeURIComponent(filter)}&page=${page}&size=${size}`;

      return this.http.get<FiltroResponse>(fullUrl, { 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    getAcreditacionesUsuarioDenegadas (page: number = 0, size: number = 5): Observable<FiltroResponse> {
      const filter = 'usuario_id:IGUAL:2&estado:igual:rechazado';
      const fullUrl = `${this.apiUrl}/estadoAcreditacion?filter=${encodeURIComponent(filter)}&page=${page}&size=${size}`;

      return this.http.get<FiltroResponse>(fullUrl, { 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
    
    getMensajes(): Observable<FiltroResponse> { 
      return this.getDataObservable<FiltroResponse>('mensajes');
    }

    updateEstadoAcreditacion(id: number, data: any): Observable<FiltroResponse> {
      return this.http.put<FiltroResponse>(`${this.apiUrl}/estadoAcreditacion/${id}`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    crearMensaje(mensaje: any): Observable<MensajeResponse> {
      return this.http.post<MensajeResponse>(`${this.apiUrl}/mensajes`, mensaje);
    }

    infoAcreditacion={
      idAcreditacion: '',
      idUsuario: '',
      idAsesor: '',
      idModulo: '',
      estado: '',
      nombreModulo: '',
      nombreUsuario: '',
      nombreAsesor: ''
  }
}