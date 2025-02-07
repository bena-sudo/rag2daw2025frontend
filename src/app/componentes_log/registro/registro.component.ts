import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceLogService } from '../service/service-log.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

  formRegistro!: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceLog:ServiceLogService, private router:Router){ }

  ngOnInit(): void {
    this.formRegistro = this.formBuilder.group({
      nickname: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required]

    })
  }


  newUser() {
    if (this.formRegistro.valid) {
      this.serviceLog.userRegistro(this.formRegistro.value).subscribe({
        next: () => {
          console.log("Usuario creado con éxito.");
          this.router.navigate(['/inicio']);
        },
        error: (err) => console.log("Error al registrar usuario: ", err)
      });
    }
  }
  


}
