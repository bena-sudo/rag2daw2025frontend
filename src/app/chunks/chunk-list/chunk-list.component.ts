import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Chunk } from '../chunk';
import { ChunksService } from '../../service/chunks.service';
import { Estado, EstadoColor } from '../../enums/estado.enum';

@Component({
  selector: 'app-chunk-list',
  templateUrl: './chunk-list.component.html',
  styleUrl: './chunk-list.component.css'
})
export class ChunkListComponent implements /*OnInit, */OnDestroy {
  @Input() chunks!: Chunk[];
  Estado = Estado;
  EstadoColor = EstadoColor;

  @Output() actualiza = new EventEmitter<boolean>();

  valorEditar: number = -1;
  
  private destroy$ = new Subject<void>();

  constructor(private chunkService: ChunksService) {}

  ngOnInit(): void {
  }

  cambiarEstado(estado: Estado, id: number) {
    const chunk = this.chunks.find(chunk => chunk.id === id);
    
    if (chunk) {
      chunk.estado = estado;
      this.actualizarChunk(chunk);
    }
  }

  notificarActualizacion() {
    this.actualiza.emit(true);
  }

  actualizarChunk(chunk: Chunk) {
    this.chunkService.updateChunk(chunk).pipe(
      takeUntil(this.destroy$) // Cancela la suscripción cuando el componente se destruye
    ).subscribe({
      next: () => {
        console.log('Chunk actualizado con éxito a ',chunk.estado);
        this.notificarActualizacion();
      },
      error: (err) => console.error('Error al actualizar el chunk:', err)
    });
  }

  editar(chunk: Chunk, confirmar: boolean = false) {
    if (confirmar) {
      let confirm = window.confirm("Al modificar, el estado pasará a PENDIENTE");
      if (confirm) {
        chunk.estado = Estado.PENDIENTE;
        this.actualizarChunk(chunk);
      } else {
        return;
      }
    }
    this.valorEditar = chunk.id!;
  }
  
  modificar(texto: string, chunk: Chunk){
    chunk.chunkText = texto;
    this.actualizarChunk(chunk);
    this.valorEditar = -1;
  }

  delete(id: number) {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este elemento?");
    if (confirmacion) {
      this.chunkService.deleteChunk(id).pipe(
        takeUntil(this.destroy$) // Cancela la suscripción cuando el componente se destruye
      ).subscribe({
        next: () => {
          this.chunks = this.chunks.filter(chunk => chunk.id !== id);
          console.log('Chunk eliminado con éxito');
        },
        error: (err) => console.error('Error al eliminar el chunk:', err)
      });
    }
  }

  getEstadoColor(estado: string): string {
    return EstadoColor[estado as Estado] || 'black'; // Color por defecto si hay un error
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
