import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RecipeUser } from '../../interface/recipe-user';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {
  private authUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  //Metodo para retornar todos los usuarios
  getUsers(page: number = 0, size: number = 5): Observable<{users:RecipeUser[], totalPages: number}> {
    return this.http.get<any>(`${this.authUrl}/usuarios?page=${page}&size=${size}`, this.httpOptions).pipe(
      map(response => ({
        users: response.content,
        totalPages: response.totalPages
      }))
    )
  }

  //Metodo para ver si el usuario logeado en este momento de que tipo es
  getRolUser(): string | null{
    return localStorage.getItem('user_roles')
  }
}
