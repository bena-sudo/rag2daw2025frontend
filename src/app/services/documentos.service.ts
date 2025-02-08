import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDataObservable<T>(endpoint: string, params?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { params, headers: { 'Content-Type': 'application/json' } });
  }

  getDocumentosById(id: number): Observable<any> {
    return this.getDataObservable<any>(`documentos/id/${id}`);
  }

  subirDocumento(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/documentos/upload`, formData);
  }

  // Método para actualizar documentos (puedes agregar más lógica aquí)
  subirDocumentosActualizados(documentos: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/documentos/actualizar`, documentos);
  }
}
