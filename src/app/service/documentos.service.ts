import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Documento } from '../interface/documento';
import { Chunk } from '../chunks/chunk';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  private readonly apiUrl = 'http://localhost:8090/api/v1';

  constructor(private readonly http: HttpClient) {}
  
  subirDocumento(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/documento", formData);
}

  
  getDocumentos(pagina: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/documentos?page=${pagina}&size=10&sort=id`
    );
  }

  getDocumento(documentoID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/documento/${documentoID}`);
  }

  searchDocumentos(filtros: any,pagina: number): Observable<any> {
    let query = `${this.apiUrl}/documentos?`;
    if (filtros.nombre) {
      query += `&filter=nombreFichero:CONTIENE:` + filtros.nombre;
    }
    if (filtros.estado) {
      query += `&filter=estado:CONTIENE:` + filtros.estado;
    }

    if (filtros.fechaCreacion) {
      query += `&filter=fechaCreacion:IGUAL:` + filtros.fechaCreacion;
    }

    if (filtros.fechaModificacion) {
      query += `&filter=fechaRevision:IGUAL:` + filtros.fechaModificacion;
    }

    query += `&page=${pagina}&size=10&sort=id`;

    console.log(query);
    
    return from(this.http.get<any>(query)).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  getPDFBase64blob(documento: Documento): string {    
    const byteCharacters = atob(documento.base64Documento);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return URL.createObjectURL(
      new Blob([byteArray], { type: documento.contentTypeDocumento })
    );
  }

  // https://www.geeksforgeeks.org/how-to-convert-base64-to-file-in-javascript/

  deleteDocumento(documentoID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documentoID}`);
  }

  updateDocumento(documento: Documento): Observable<Documento> {
    return this.http.put<Documento>(`${this.apiUrl}/documento/${documento.id}`, documento);
  }

  createDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(`${this.apiUrl}`, documento);
  }

  searchDocumentoById(documentoID: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.apiUrl}/documento/${documentoID}`).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  //Función para envio de documento y creación de sus chunks
  enviarDocumento(documentoID: number, idUsuario: number = 1): Observable<Chunk[]>{
    return this.http.get<Chunk[]>(`${this.apiUrl}/rag/subirDocumento/${documentoID}/${idUsuario}`).pipe(
      catchError((error) => throwError(() => error))
    );
  }
  
}


