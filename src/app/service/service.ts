import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {  
  private baseUrl = 'http://localhost:8090/api/rag/v1/';

  constructor(private http: HttpClient) {}

  
  // Chats
  getChats(): Observable<any> {
    return this.http.get(`${this.baseUrl}returnChats`);
  }

  createChat(body: object): Observable<any> {
    return this.http.post(`${this.baseUrl}createChat`, body);
  }

  updateChat(body: object): Observable<any> {
    return this.http.put(`${this.baseUrl}createQuestionChat`, body);
  }

  deleteChat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteChat?idChat=${id}`);
  }


  //  Preguntas
  returnPreguntasByIdChat(idChat: number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}returnPreguntasByIdChat?idChat=${idChat}`);
  }

  createQuestionChat(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createQuestionChat`, data);
  }

  answerQuestionChat(id: number, user: string): Observable<any> {
    return this.http.get(`${this.baseUrl}answerQuestionChat?idQuestionchat=${id}&user=${user}`);
  }

  updateQuestion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}updatePregunta/${id}`, data);
  }

  // Filtros
  getListUsuarios(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}getListUsuarios`);
  }
}
