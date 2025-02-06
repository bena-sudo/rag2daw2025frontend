import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeUser } from '../interface/recipe-user';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogService {

  private registroUrl = 'http://localhost:8090/auth/nuevo';

  constructor(private http: HttpClient) { }

  //Metodo para registrar
  userRegistro(user:RecipeUser): Observable<RecipeUser>{
    //Crear headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', //Decimos que enviamos un json
      'nickname': user.nickname,
      'nombre': user.nombre,
      'email': user.email,
      'password': user.password

    })

    return this.http.post<RecipeUser>(this.registroUrl, null, {headers});
  }
}
