import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chunk } from '../chunks/chunk';

@Injectable({
  providedIn: 'root'
})
export class ChunksService {
  private apiUrl = 'http://localhost:8090/api/v1/'; // Cambia la URL según tu API

  constructor(private http: HttpClient) {}

  getChunks(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"chunks?page=0&size=10&sort=id");
  }

  // Consulta los chunks desde la API
  getChunksByDocumentId(documentId: number = 2): Observable<any> {
    const url = `${this.apiUrl}chunks?filter=idDocumento:IGUAL:${documentId}&page=0&size=100&sort=chunkOrder`;  // Ajusta la URL según tu API
    return this.http.get<any>(url);
  }

  updateChunk(chunk: Chunk): Observable<Chunk> {
    return this.http.put<Chunk>(`${this.apiUrl}chunk/${chunk.id}`,chunk);
  }
}
