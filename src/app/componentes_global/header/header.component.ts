import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceLogService } from '../../componentes_log/service/service-log.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  isLoggedIn: boolean = false;
  userRole: string [] = [];

  constructor(private authService: ServiceLogService, private router:Router) { }

  ngOnInit() {
    //Suscripcion al estado actual de la autenticacion
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    //Suscripcion actual al estado de el rol del usuario
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      console.log(this.userRole)
    })
  }

  logout(){
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
