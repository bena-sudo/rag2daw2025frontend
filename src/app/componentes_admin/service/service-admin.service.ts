import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { RecipeUser } from '../../interface/recipe-user';
import { ModifUser } from '../../interface/modif-user';
import { InfoRoles } from '../../interface/info-roles';

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
    return this.http.get<any>(`${this.authUrl}/usuarios?page=${page}&size=${size}`).pipe(
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

  //Metodo para retornar la informacion de un usuario
  getUser(id:string | undefined): Observable<RecipeUser | undefined> {

    return this.http.get<any>(`${this.authUrl}/v1/usuarios/${id}`);

  }

  //Metodo para borrar usuario
  deleteUser(id:string | undefined): Observable<any>{
    return this.http.delete(`${this.authUrl}/v1/usuarios/${id}`);
  }

  //Metodo para modificar usuarios
  updateUser(user: ModifUser, id: string): Observable<RecipeUser> {
    return this.http.put<RecipeUser>(`${this.authUrl}/v1/usuarios/${id}`, user, this.httpOptions).pipe(
    
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ocurrió un error insesperado.';
            if(error.status === 400) {
              errorMessage = "Email / Nickname en uso. Prueba con otro.";
            }else if (error.status === 500){
              errorMessage = "Error en el servidor. Intentelo mas tarde";
            }
    
            return throwError(() => errorMessage);
          })
        );
  }

  //Metodo que retorna todos los rols àctivos
  getRolsUser(): Observable<InfoRoles[]>{
    return this.http.get<InfoRoles[]>(`${this.authUrl}/v1/roles`).pipe(
      catchError((error:HttpErrorResponse) => {
        return throwError(() => 'Ocurrio un error inesperado.')
      })
    )
  }
  //Metodo que retorna todos los roles y usuarios assignados a el
  getRolUsers(nombreRol:string ): Observable<InfoRoles[]>{
    return this.http.get<InfoRoles[]>(`${this.authUrl}/v1/roles/${nombreRol}/usuarios`);
  }
  
  //Metodo que retorna todos los usuarios que empiezan por el texto proporcionado
  getUsersStartsWith(text:string ): Observable<InfoRoles[]>{
    return this.http.get<InfoRoles[]>(`${this.authUrl}/v1/usuarios?filter=nombre:EMPIEZA:${text}&sort=id&page=0&size=10`);
  }

}
