import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFiltros } from '../i-filtros';

@Injectable({
  providedIn: 'root'
})
export class TablaAcreditacionesService {

    private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment
  
    constructor(private http: HttpClient) {}
  
    getDataObservable<T>(endpoint: string, params?: any): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params, headers: { 'Content-Type': 'application/json' } });
    }

    getAcreditaciones(): Observable<IFiltros> {
        return this.getDataObservable<IFiltros>('estadoAcreditacion');
    }

    getAcreditacionesFiltrado(page: number = 0, size: number = 5): Observable<IFiltros> {
        return this.getDataObservable<IFiltros>('estadoAcreditacion', { page, size });
    }
    
    getUsuarios(): Observable<IFiltros> {
        return this.getDataObservable<IFiltros>('usuarios');
    }

    getModulos(): Observable<IFiltros> {
        return this.getDataObservable<IFiltros>('modulos');
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