import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Documento } from '../interface/documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  private readonly apiUrl = 'http://localhost:8090/api/v1';

  constructor(private readonly http: HttpClient) {}

  getDocumentos(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/documentos?filters=page=0&size=10&sort=id`
    );
  }

  searchDocumentos(filtros: any): Observable<Documento[]> {
    let query = `${this.apiUrl}/documentos?`;
    if (filtros.nombre) {
      query += `&filter=nombreFichero:CONTIENE:` + filtros.nombre;
    }
    if (filtros.estado) {
      query += `&filter=estadoDocumento:CONTIENE:` + filtros.estado;
    }

    if (filtros.fechaCreacion) {
      query += `&filter=fechaCreacion:IGUAL:` + filtros.fechaCreacion;
    }

    if (filtros.fechaModificacion) {
      query += `&filter=fechaRevision:IGUAL:` + filtros.fechaModificacion;
    }

    query += '&page=0&size=10&sort=id';

    return from(this.http.get<any>(query)).pipe(
      map((data) => {
        return data.content || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
