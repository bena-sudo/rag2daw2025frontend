import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceLogService } from '../service/service-log.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(private serviceLog:ServiceLogService, private router:Router){ }


  sendLogin() {

    this.formSubmitted = true;

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.loading = true;
    this.errorMessage = '';

    
    this.serviceLog.userLogin(credentials).subscribe({
      next: () => {
        
        this.loading = false;

        this.router.navigate(['/inicio']); 
      },
      error: () => {
        
        this.loading = false;

        this.errorMessage = 'Email o contraseña incorrectos';

      }
    });
  }
}
