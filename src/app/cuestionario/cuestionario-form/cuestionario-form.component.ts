import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormArray,FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { BbddService } from '../../services/BBDD.service';

@Component({
  selector: 'app-cuestionario-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuestionario-form.component.html',
  styleUrls: ['./cuestionario-form.component.css']
})
export class CuestionarioFormComponent implements OnInit {
  preguntas: any[] = [];
  respuestas: any[] = []
  preCuestionarioForm: FormGroup;

  constructor(private bbddService: BbddService,private formBuilder: FormBuilder) {
    this.preCuestionarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      respuestas: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.loadPreguntas();
  }

  loadPreguntas(): void {
    const cuestionarioId = 1; 
    this.bbddService.getCuestionarioById(cuestionarioId).subscribe(
      (preguntas) => {
        this.preguntas = preguntas;
        console.log(this.preguntas);
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    );
  }

  get strNombreValid() {
    if (this.preCuestionarioForm.get('nombre')?.untouched) {
      return ''
    } else if(this.preCuestionarioForm.get('nombre')?.touched && this.preCuestionarioForm.get('nombre')?.valid){
      return 'is-valid'
    } else {
      return 'is-invalid'
    }
  }

  get strTelefonoValid() {
    if (this.preCuestionarioForm.get('telefono')?.untouched) {
      return ''
    } else if(this.preCuestionarioForm.get('telefono')?.touched && this.preCuestionarioForm.get('telefono')?.valid){
      return 'is-valid'
    } else {
      return 'is-invalid'
    }
  }

  
}

