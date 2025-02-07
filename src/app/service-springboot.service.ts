import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceSpringbootService {

  constructor() { }

  getDatos(tabla: string, campos: any, filtros: any) {
    if (!campos) {
      campos = "*"
    }
    let ruta = `192.168.8.35:8090/api/rag/v1/${tabla}?`
  }
}
