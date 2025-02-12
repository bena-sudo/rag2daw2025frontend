import { Component, OnInit } from '@angular/core';
import { RecipeUser } from '../../interface/recipe-user';
import { ServiceAdminService } from '../service/service-admin.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuarios',
  imports: [RouterLink],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent implements OnInit {
  users: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private adminService: ServiceAdminService, private router:Router) {}

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

  //Metodo para borrar un usuario probocando una alerta de seguridad
  // Método para borrar un usuario y actualizar la lista sin recargar la página
  borrarUsuario(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe({
          next: () => {
            // Filtrar la lista para eliminar el usuario visualmente
            this.users = this.users.filter(user => user.id !== id);
  
            // Mostrar mensaje de éxito
            Swal.fire("Eliminado", "El usuario ha sido eliminado con éxito.", "success");
          },
          error: (err) => {
            console.error("Error al eliminar usuario:", err);
            Swal.fire("Error", "Hubo un problema al eliminar el usuario.", "error");
          }
        });
      }
    });
  }

}