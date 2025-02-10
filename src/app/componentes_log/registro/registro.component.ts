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
export class RegistroComponent implements OnInit {
  formRegistro!: FormGroup;
  formSubmitted: boolean = false; // Para rastrear si el usuario presionó "Submit"

  constructor(private formBuilder: FormBuilder, private serviceLog: ServiceLogService, private router: Router) {}

  ngOnInit(): void {
    this.formRegistro = this.formBuilder.group({
      nickname: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ]
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      fecha_nacimiento: ['', Validators.required]
    });
  }

  newUser() {
    this.formSubmitted = true; // Indica que el usuario intentó enviar el formulario

    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched(); // Muestra los errores en todos los campos
      return;
    }

    // Si es válido, envía los datos al servicio
    this.serviceLog.userRegistro(this.formRegistro.value).subscribe({
      next: () => {
        console.log('Usuario creado con éxito.');
        this.router.navigate(['/inicio']);
      },
      error: (err) => console.log('Error al registrar usuario: ', err)
    });
  }
}
