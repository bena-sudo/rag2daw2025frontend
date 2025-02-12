import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private respuestas: any[] = [];

  constructor() {}

  setRespuestas(respuestas: any[]) {
    this.respuestas = respuestas;
  }

  getRespuestas() {
    return this.respuestas;
  }

}
