import { Component, Input, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { RecipeUser } from '../../interface/recipe-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InfoRoles } from '../../interface/info-roles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar-user',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './modificar-user.component.html',
  styleUrl: './modificar-user.component.css'
})
export class ModificarUserComponent implements OnInit {

  @Input('id') IdUser?: string;
  public user: RecipeUser | undefined;
  public rolesActivos: InfoRoles[] = [];
  formulario!: FormGroup;
  formSubmitted: boolean = false;

  constructor(private adminService: ServiceAdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      rolesIds: [[]] 
    });

    this.getRols(); 
  }

  actualizarUsuario() {
    this.formSubmitted = true;
    
    if (this.formulario.invalid) {
      alert('Por favor, rellena todos los campos correctamente.');
      return;
    }

    if (this.IdUser) {
      
      const selectedRoles = this.formulario.value.rolesIds;

      
      const updatedUser = {
        nombre: this.formulario.value.nombre,
        nickname: this.formulario.value.nickname,
        email: this.formulario.value.email,
        telefono: this.formulario.value.telefono,
        roleIds: selectedRoles 
      };

      console.log(updatedUser);

      this.adminService.updateUser(updatedUser, this.IdUser).subscribe({
        next: () => {
          this.router.navigate(['/users-list']);
          console.log('Usuario actualizado');
        },
        error: err => console.log(err)
      });
    }
  }

  //Obtener rols de la base de datos
  getRols() {
    this.adminService.getRolsUser().subscribe({
      next: rols => {
        this.rolesActivos = rols;
        console.log(this.rolesActivos);
        this.getUser();
      },
      error: err => console.log(err)
    });
  }

  //Obtener el usuario a modificar y asignarle sus roles actuales
  getUser() {
    if (!this.IdUser) return;

    this.adminService.getUser(this.IdUser).subscribe({
      next: user => {
        this.user = user;
        console.log(user);

        // Extraer los IDs de los roles asignados al usuario
        const userRoleIds = user?.roleIds || [];

        this.formulario.patchValue({
          nombre: user?.nombre,
          nickname: user?.nickname,
          email: user?.email,  
          telefono: user?.telefono,
          rolesIds: userRoleIds 
        });
      },
      error: err => console.log(err)
    });
  }

  // Manejar la selección/deselección de roles
  toggleRole(roleId: number) {
    const selectedRoles: number[] = this.formulario.value.rolesIds;

    if (selectedRoles.includes(roleId)) {
      // Si el rol ya está seleccionado, lo eliminamos
      this.formulario.patchValue({
        rolesIds: selectedRoles.filter(id => id !== roleId)
      });
    } else {
      // Si el rol no está seleccionado, lo agregamos
      this.formulario.patchValue({
        rolesIds: [...selectedRoles, roleId]
      });
    }
  }
}
