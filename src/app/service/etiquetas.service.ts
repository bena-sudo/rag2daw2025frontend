import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etiqueta } from '../interface/etiqueta';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {

  private readonly apiUrl = 'http://localhost:8090/api/v1/etiqueta/etiquetas';

  constructor(private readonly http: HttpClient) { }

  getEtiquetas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
