import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceLogService } from '../service/service-log.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private serviceLog:ServiceLogService, private router:Router){ }


  sendLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.loading = true;
    this.errorMessage = '';

    
    this.serviceLog.userLogin(credentials).subscribe({
      next: (response) => {
        
        this.loading = false;

        // Redirigir al usuario inicio para que se le adapte al tipo de rol al que pertenezca
        this.router.navigate(['/inicio']); 
      },
      error: (err) => {
        
        this.loading = false;

        this.errorMessage = err.message;

      }
    });
  }
}
