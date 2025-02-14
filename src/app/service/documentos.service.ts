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

  convertirArchivoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] || ''); // Eliminamos el prefijo 'data:application/pdf;base64,'
      reader.onerror = error => reject(error);
    });
  }

  subirDocumento(documento: any, file: File) {
    return this.convertirArchivoABase64(file).then(base64 => {
      const documentoFinal = {
        ...documento,
        base64Documento: base64,
        contentTypeDocumento: file.type,
        extensionDocumento: file.name.split('.').pop()
      };
      console.log('Datos que se envían:', documentoFinal);
      return this.http.post<any>(this.apiUrl+"/documento", documentoFinal);
    });
  }

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

  deleteDocumento(documentoID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documentoID}`);
  }

  updateDocumento(documento: Documento): Observable<Documento> {
    return this.http.put<Documento>(`${this.apiUrl}/${documento.id}`, documento);
  }

  createDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(`${this.apiUrl}`, documento);
  }
  
}
