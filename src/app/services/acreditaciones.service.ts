import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcreditacionesService {

  usuarios = [
    { idUsuario: '1', nombre: 'Joaquin', rol: 'Administrador' },
    { idUsuario: '2', nombre: 'Maria', rol: 'Usuario' },
    { idUsuario: '3', nombre: 'Carlos', rol: 'Moderador' },
    { idUsuario: '4', nombre: 'Ana', rol: 'Usuario' },
    { idUsuario: '5', nombre: 'Luis', rol: 'Usuario' }
  ];

  modulos = [
    { idModulo: '1', nombre: 'Matemáticas' },
    { idModulo: '2', nombre: 'Física' },
    { idModulo: '3', nombre: 'Desarrollo Web' },
    { idModulo: '4', nombre: 'Química' },
    { idModulo: '5', nombre: 'Biología' }
  ];

  acreditaciones = [
    { idAcreditacion: '1', estado: 'Asignado', idUsuario: '2', idModulo: '1', idAsesor: '1' },
    { idAcreditacion: '2', estado: 'Pendiente', idUsuario: '2', idModulo: '2', idAsesor: null },
    { idAcreditacion: '3', estado: 'Pendiente', idUsuario: '3', idModulo: '3', idAsesor: null },
    { idAcreditacion: '4', estado: 'Asignado', idUsuario: '4', idModulo: '4', idAsesor: '1' },
    { idAcreditacion: '5', estado: 'Pendiente', idUsuario: '5', idModulo: '5', idAsesor: null }
  ];

  mensajes = [
    { idMensaje: '1', contenido: 'Bienvenido al estado de acreditacion, exponga sus dudas aqui', idUsuario: '1', idAcreditacion: '1' },
    { idMensaje: '2', contenido: 'Gracias, como va el proyecto?', idUsuario: '2', idAcreditacion: '1' },
    { idMensaje: '3', contenido: 'jaja pa que quieres saber eso', idUsuario: '1', idAcreditacion: '1' },
    { idMensaje: '4', contenido: 'Bienvenido al estado de acreditacion, exponga sus dudas aqui', idUsuario: '1', idAcreditacion: '4' },
    { idMensaje: '5', contenido: 'Gracias, de momento no tengo dudaas', idUsuario: '4', idAcreditacion: '4' }
  ];

  infoAcreditacion={
    idAcreditacion: '',
    idUsuario: '',
    idAsesor: '',
    idModulo: '',
    estado: '',
    nombreModulo: '',
    nombreUsuario: '',
    nombreAsesor: ''
  }

  

  constructor() { }
}