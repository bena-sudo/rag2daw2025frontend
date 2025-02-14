import { Component, Input, OnInit } from '@angular/core';
import { Chunk } from '../chunk';
import { ChunksService } from '../../service/chunks.service';
import { Estado, EstadoColor } from '../../enums/estado.enum';

@Component({
  selector: 'app-chunk-list',
  imports: [],
  templateUrl: './chunk-list.component.html',
  styleUrl: './chunk-list.component.css'
})
export class ChunkListComponent implements OnInit{
    @Input() chunks!: Chunk[];
    Estado = Estado;
    EstadoColor = EstadoColor;

    constructor(private chunkService: ChunksService) {}

    ngOnInit(): void {
      this.chunkService.getChunks().subscribe({
        next: (respuesta) => {
          this.chunks = respuesta.content;
          console.log('Datos obtenidos:', this.chunks);
        },
        error: (error) => {
          console.error('Error al obtener datos:', error);
        }
      });
    }

    cambiarEstado(estado: Estado, id: number) {
      const chunk = this.chunks.find(chunk => chunk.id === id);
      
      if (chunk) {
        chunk.estado = estado;
        console.log(`El estado de ${id} cambiado a ${estado}`);
        this.actualizarChunk(chunk);
      }
    }

    actualizarChunk(chunk: Chunk) {
      this.chunkService.updateChunk(chunk).subscribe({
        next: (response) => {
          console.log('Chunk actualizado con éxito:', response);
        },
        error: (err) => {
          console.error('Error al actualizar el chunk:', err);
        }
      });
    }
    

    editar(){
      console.log("PA EDITAR");
      
    }

    getEstadoColor(estado: string): string {
      return EstadoColor[estado as Estado] || 'black'; // Color por defecto si hay un error
    }
}
