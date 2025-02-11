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

  updateChunk(chunk: Chunk): Observable<Chunk> {
    return this.http.put<Chunk>(`${this.apiUrl}chunk/${chunk.id}`,chunk);
  }
}
