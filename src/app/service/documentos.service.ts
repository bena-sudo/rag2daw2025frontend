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

  // convertirArchivoABase64(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
      
  //     reader.onload = () => resolve(reader.result?.toString().split(',')[1] || ''); // Eliminamos el prefijo 'data:application/pdf;base64,'
  //     reader.onerror = error => reject(error);
  //   });
  // }

  // subirDocumento(documento: any, file: File) {
  //   return this.convertirArchivoABase64(file).then(base64 => {
  //     const documentoFinal = {
  //       ...documento,
  //       base64Documento: base64,
  //       contentTypeDocumento: file.type,
  //       extensionDocumento: file.name.split('.').pop()
  //     };
  //     console.log('Datos que se envían:', documentoFinal);
  //     return this.http.post<any>(this.apiUrl+"/documento", documentoFinal);
  //   });
  // }

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
    return this.http.put<Documento>(`${this.apiUrl}/${documento.id}`, documento);
  }

  createDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(`${this.apiUrl}`, documento);
  }

  searchDocumentoById(documentoID: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.apiUrl}/${documentoID}`).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}


