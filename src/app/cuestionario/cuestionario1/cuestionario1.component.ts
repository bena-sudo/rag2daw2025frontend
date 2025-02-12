import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BbddService } from '../../services/BBDD.service';
import { DatosService } from '../../services/datos.service';
import { RouterModule } from '@angular/router';



interface Pregunta {
  id: number;
  contenido: string;
}

@Component({
  selector: 'app-cuestionario1',
  templateUrl: './cuestionario1.component.html',
  styleUrls: ['./cuestionario1.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transforsm: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class Cuestionario1Component implements OnInit {
  preguntas: any[] = [];
  formulario: FormGroup;
  preguntaActual = 0;
  respuestas: any[] = [];  
  usuarioId: number | null = null;
  animacion: string = 'entrada';
  respuestaSeleccionada: string | null = null;

  constructor(private fb: FormBuilder, private bbddService: BbddService, private datosService: DatosService) {
    this.formulario = this.fb.group({ respuesta: [''] });
  }

  ngOnInit() {
    this.cargarPreguntas();

  }

  cargarPreguntas(): void {
    this.usuarioId = 1;
    const cuestionarioId = 1; 
    this.bbddService.getCuestionarioById(cuestionarioId).subscribe(
      (preguntas) => {
        this.preguntas = preguntas;
        this.inicializarRespuestas();
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    );
  }

  inicializarRespuestas() {
    this.respuestas = this.preguntas.map(pregunta => ({
      preguntaId: pregunta.id,
      textoPregunta: pregunta.contenido,
      usuarioId: null,
      respuesta: 'ns_nc'
    }));
  }


  siguientePregunta() {
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.animacion = 'salida';
      setTimeout(() => {
        this.preguntaActual++;
        this.animacion = 'entrada';
      }, 300);
    }
  }

  anteriorPregunta() {
    if (this.preguntaActual > 0) {
      this.animacion = 'salida';
      setTimeout(() => {
        this.preguntaActual--;
        this.animacion = 'entrada';
      }, 300);
    }
  }

  irAPregunta(index: number) {
  this.animacion = 'salida';

  setTimeout(() => {
    this.preguntaActual = index;
    this.animacion = 'entrada';
    this.formulario.reset();
  }, 300);
  }

  seleccionarRespuesta(respuesta: string) {
    const preguntaId = this.preguntas[this.preguntaActual].id;
    this.respuestas[this.preguntaActual] = { respuesta, preguntaId };
  }

  obtenerRespuestaSeleccionada(): string {
    const respuesta = this.respuestas[this.preguntaActual];
    return respuesta ? respuesta.respuesta : ''; 
  }

  finalizar() {
    const respuestasFinales = Object.keys(this.respuestas).map(key => ({
      respuesta: this.respuestas[parseInt(key)].respuesta,
      preguntaId: this.preguntas[parseInt(key)].id,
      usuarioId: this.usuarioId,
      preguntaTexto: this.preguntas[parseInt(key)].texto
    }));

    this.datosService.setRespuestas(respuestasFinales);

    this.bbddService.enviarRespuestas(respuestasFinales).subscribe(
      () => {
        console.log('Respuestas enviadas con éxito');
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
      }
    );
  }
}