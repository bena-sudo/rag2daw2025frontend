import { Component, Input, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { RecipeUser } from '../../interface/recipe-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modificar-user',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './modificar-user.component.html',
  styleUrl: './modificar-user.component.css'
})
export class ModificarUserComponent implements OnInit{

  @Input('id') IdUser?: string;
  public user: RecipeUser | undefined;
  formulario!: FormGroup;
  formSubmitted: boolean = true;



  constructor(private adminService:ServiceAdminService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.getUser();

    this.formulario = this.formBuilder.group({
          nickname: [this.user?.nickname, Validators.required],
          nombre: [this.user?.nombre, Validators.required],
          email: [this.user?.email, [Validators.required, Validators.email]],
          password: [
            this.user?.password,
            [
              Validators.required,
              Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
            ]
          ],
          telefono: [this.user?.telefono, [Validators.required, Validators.pattern('^[0-9]{9}$')]]
        });
    
  }

  actualizarUsuario(){
    this.formSubmitted = true;

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
