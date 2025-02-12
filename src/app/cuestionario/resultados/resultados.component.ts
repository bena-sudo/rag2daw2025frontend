import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  imports: [CommonModule]
})
export class ResultadosComponent implements OnInit {
  respuestas: { preguntaTexto: string, respuesta: string }[] = [];

  explicaciones: {si: string, no: string}[] = [
  {
    si: '',
    no: 'Lo sentimos, no puedes presentarte al procedimiento. Una vez tengas la nacionalidad en regla lo podrás hacer',
  },
  {
    si: 'Si cumples los requisitos de experiencia laboral o de formación no formal, podrás optar a Unidades de Competencia de nivel I, II y III',
    no: '',
  },
  {
    si: 'Si cumples los requisitos de experiencia laboral o de formación no formal, podrás optar a Unidades de Competencia de nivel I',
    no: 'Lo sentimos, no puedes presentarte al procedimiento. Le recomendamos que asista a un Centro de Formación Permanente de Adultos o a un Espacio Labora para que te orienten sobre tu formación',
  },
  {
    si: 'Puedes presentarte al procedimiento y podrás optar a Unidades de Competencia de nivel I, II, III',
    no: 'No puedes iniciar el procedimiento.',
  },
  {
    si: 'Puedes presentarte al procedimiento y podrás optar a Unidades de COmpetencia de nivel I, pero revisa la siguiente pregunta.',
    no: 'No puedes iniciar el procedimiento por experiencia laboral, pero tal vez puedas hacerlo por formación no formal.',
  },
  {
    si: 'También podrás optar a Unidades de Competencia de nivel II y III',
    no: '',
  },
  {
    si: 'Puedes presentarte al procedimiento y podrás optar a Unidades de Competencia de nivel I, II y III.',  
    no: '',
  },
  {
    si: 'Puedes presentarte al procedimiento y podrás optar a Unidades de Competencia de nivel I.',
    no: 'Tampoco podrás presentarte al procedimiento por formación no formal. Le recomendamos que asista a un Centro de Formación Permanente de Adultos o a un Espacio Labora para que te orienten sobre tu formación',
  }
  ];

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.respuestas = this.datosService.getRespuestas();  
    console.log("RESPUESTAS:", JSON.stringify(this.respuestas, null, 2));    
  }
    
}