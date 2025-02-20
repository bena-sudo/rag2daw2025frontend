import { Component, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { Router, RouterLink } from '@angular/router';
import { InfoRoles } from '../../interface/info-roles';

@Component({
  selector: 'app-roles-list',
  imports: [RouterLink],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent implements OnInit {

  public rolesActivos: InfoRoles[] = [];
  formSubmitted: boolean = false;
  messageError: string = '';

  constructor(private adminService: ServiceAdminService, private router: Router) { }



  ngOnInit(): void {
    this.getRols(); 
  }


  getRols() {
    this.adminService.getRolsUser().subscribe({
      next: rols => {
        this.rolesActivos = rols;
        console.log(this.rolesActivos);
      },
      error: err => console.log(err)
    });
  }
}