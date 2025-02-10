import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Etiqueta } from '../interface/etiqueta';

@Injectable({
  providedIn: 'root',
})
export class EtiquetasService {
  private readonly apiUrl = 'http://localhost:8090/api/v1/etiqueta';

  constructor(private readonly http: HttpClient) {}

  getEtiquetas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/etiquetas`);
  }

  deleteEtiqueta(etiquetaID: number): Observable<void> {
    console.log(`${this.apiUrl}/${etiquetaID}`);

    return this.http.delete<void>(`${this.apiUrl}/${etiquetaID}`);
  }

  searchEtiquetas(query: string): Observable<Etiqueta[]> {
    return from(
      this.http.get<any>(
        `${this.apiUrl}/etiquetas?filter=nombre:CONTIENE:${query}`
      )
    ).pipe(
      map((data) => {
        return data.content || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
