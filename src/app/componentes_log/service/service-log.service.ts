import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { RecipeUser } from '../interface/recipe-user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogService {

  private authUrl = environment.authUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string[]>(this.getUserRoles());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  //Metodo para registrar
  userRegistro(user: RecipeUser): Observable<RecipeUser> {
    return this.http.post<RecipeUser>(`${this.authUrl}/nuevo`, user, this.httpOptions);
  }


  //Metodo para Logear un usuario
  userLogin(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string; authorities: { authority: string }[] }>(`${this.authUrl}/login`, JSON.stringify(credentials), this.httpOptions)
      .pipe(
        //Si la respuesta es correcta guarda el token en local storage
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            this.updateLoginStatus(); //Actualiza el estado del login

            // Extraer y guardar todos los roles del usuario
            if (response.authorities && response.authorities.length > 0) {
              const roles = response.authorities.map(auth => auth.authority); // Extrae roles en un array
              localStorage.setItem('user_roles', JSON.stringify(roles)); // Guarda los roles en localStorage
              this.updateUserRoles(); // Actualiza el estado de los roles
            }

            console.log('Roles del usuario:', response.authorities.map(auth => auth.authority));
            console.log('Token del usuario:', response.token);
          }
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(() => new Error('Credenciales inválidas o error en el servidor.'));
        })
      )
  }

  //Metodo para ver si esta Logged 
  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return token !== null && !this.isTokenExpired(token);
  }

  //Metodo para comprobar si el tocken ha expirado
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      const expiration = payload.exp * 1000; // Convierte UNIX timestamp a milisegundos
      return Date.now() > expiration; // Compara la fecha actual con la expiración
    } catch (e) {
      return true; // Si hay un error, consideramos que el token ha expirado
    }
  }

  // Método para actualizar el estado del login
  updateLoginStatus() {
    this.isLoggedInSubject.next(this.isLoggedIn()); // Notifica a los suscriptores
  }

  // Método para actualizar los roles del usuario
  updateUserRoles() {
    this.userRoleSubject.next(this.getUserRoles());
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_roles');
    this.updateLoginStatus();
    this.updateUserRoles();
  }

  // Método para obtener los roles del usuario actual
  getUserRoles(): string[] {
    const roles = localStorage.getItem('user_roles');
    return roles ? JSON.parse(roles) : [];
  }

  // Método para verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }


}

