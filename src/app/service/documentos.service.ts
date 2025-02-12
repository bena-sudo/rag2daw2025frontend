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

  searchDocumentos(query: string): Observable<Documento[]> {
    return from(
      this.http.get<any>(
        `${this.apiUrl}/documentos?filter=nombreFichero:CONTIENE:${query}&page=0&size=10&sort=id`
      )
    ).pipe(
      map((data) => {
        return data.content || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
