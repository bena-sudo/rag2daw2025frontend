import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { RecipeUser } from '../interface/recipe-user';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogService {

  private authUrl = 'http://localhost:8090/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  //Metodo para registrar
  userRegistro(user: RecipeUser): Observable<RecipeUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RecipeUser>(`${this.authUrl}/nuevo`, user, this.httpOptions);
  }


  //Metodo para Logear un usuario
  userLogin(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string; authorities: { authority: string}[] }>(`${this.authUrl}/login`, JSON.stringify(credentials), this.httpOptions)
      .pipe(
        //Si la respuesta es correcta guarda el token en local storage
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);

            // Extraer el rol del usuario
            if (response.authorities && response.authorities.length > 0) {
              localStorage.setItem('user_role', response.authorities[0].authority);
            }

            console.log('El rol del usuario es: ', response.authorities[0].authority);
            console.log('El token del usuario es: ', response.token);
          }
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(() => new Error('Credenciales inválidas o error en el servidor.'));
        })
      )
  }


}

