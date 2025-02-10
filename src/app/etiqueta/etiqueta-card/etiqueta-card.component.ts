import { Component, Input } from '@angular/core';
import { EtiquetasService } from '../../service/etiquetas.service';
import { Etiqueta } from '../../interface/etiqueta';

@Component({
  selector: 'app-etiqueta-card',
  templateUrl: './etiqueta-card.component.html',
  styleUrl: './etiqueta-card.component.css',
})
export class EtiquetaCardComponent {
  @Input({ required: true }) etiqueta!: Etiqueta;

  mostrarModal: boolean = false; // Controla la visibilidad del modal
  nuevoNombre: string = ''; // Almacena el nuevo nombre de la etiqueta

  constructor(private readonly etiquetaService: EtiquetasService) {}

  /** 🗑️ Eliminar etiqueta */
  eliminarEtiqueta() {
    if (!this.etiqueta.id) {
      console.error('Error: ID de la etiqueta es null o undefined.');
      return;
    }

    this.etiquetaService.deleteEtiqueta(this.etiqueta.id).subscribe({
      next: () => {
        console.log('Etiqueta eliminada correctamente');
        window.location.reload(); // Recargar la página
      },
      error: (err) => console.error('Error al eliminar la etiqueta:', err),
      complete: () => console.log('Operación de eliminación completada'),
    });
  }

  /** ✏️ Abrir el modal para editar */
  abrirModal() {
    this.nuevoNombre = this.etiqueta.nombre!; // Cargar el nombre actual
    this.mostrarModal = true;
  }

  /** ❌ Cerrar el modal */
  cerrarModal() {
    this.mostrarModal = false;
  }

  /** 💾 Guardar cambios en la etiqueta */
  guardarCambios() {
    if (!this.nuevoNombre.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }

    const etiquetaActualizada = { ...this.etiqueta, nombre: this.nuevoNombre };

    this.etiquetaService.actualizarEtiqueta(etiquetaActualizada).subscribe({
      next: () => {
        this.etiqueta.nombre = this.nuevoNombre; // Actualizar en la UI
        this.cerrarModal();
      },
      error: (err) => console.error('Error al actualizar la etiqueta:', err),
    });
  }
}
