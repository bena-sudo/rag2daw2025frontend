import { Component, Input, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { RecipeUser } from '../../interface/recipe-user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-informacion-usuario',
  imports: [RouterLink],
  templateUrl: './informacion-usuario.component.html',
  styleUrl: './informacion-usuario.component.css'
})
export class InformacionUsuarioComponent implements OnInit{

  @Input('id') IdUser?: string;
  public user: RecipeUser | undefined;

  constructor(private adminService:ServiceAdminService) { }

  ngOnInit(): void {
    console.log("Este es el id del usuario a visualizar: ", this.IdUser);
    this.getUser();
    
  }


  getUser(){
    this.adminService.getUser(this.IdUser).subscribe({
      next: user => {
        this.user = user;
        console.log(user);
      },
      error: err => console.log(err)
    })
  }




}
