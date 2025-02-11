import { Component, OnInit } from '@angular/core';
import { RecipeUser } from '../../interface/recipe-user';
import { ServiceAdminService } from '../service/service-admin.service';

@Component({
  selector: 'app-listado-usuarios',
  imports: [],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent implements OnInit {
  users: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private adminService: ServiceAdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  //Metodo para extraer la informacion en base a la consulta
  loadUsers(page: number = 0): void {
    this.adminService.getUsers(page).subscribe(response => {
      this.users = response.users;
      this.totalPages = response.totalPages;
      this.currentPage = page;
    });
  }

  //Metodo para la paginacion y canbio de pagina
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadUsers(page);
    }
  }
}