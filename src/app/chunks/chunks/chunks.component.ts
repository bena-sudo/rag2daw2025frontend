import { Component, Input } from '@angular/core';
import { ChunksService } from '../../service/chunks.service';
import { Subscription } from 'rxjs';
import { ChunkListComponent } from "../chunk-list/chunk-list.component";
import { Estado } from '../../enums/estado.enum';
import { PaginacionComponent } from "../../documentos/paginacion/paginacion.component";

@Component({
  selector: 'app-chunks',
  imports: [ChunkListComponent, PaginacionComponent],
  templateUrl: './chunks.component.html',
  styleUrl: './chunks.component.css'
})
export class ChunksComponent {
  @Input() documentId!: number;  // ID del documento
  chunks: any[] = [];  // Todos los chunks
  filteredChunks: any[] = [];  // Chunks filtrados
  selectedStatus: string = '';  // Estado seleccionado para el filtro
  estados = Object.values(Estado);
  private chunksSubscription?: Subscription;
  paginas: number = 0;

  constructor(private chunkService: ChunksService) {}

  ngOnInit(): void {
    this.documentId=2;
    this.fetchChunks();
  }

  fetchChunks(): void {
    this.chunksSubscription = this.chunkService.getChunksByDocumentId(this.documentId)
      .subscribe(chunks => {
        this.chunks = chunks.content;
        this.paginas = chunks.totalPages;
        
        this.applyFilter();  // Aplica el filtro después de obtener los chunks
      }
    );
  }

  // Maneja el cambio del filtro de estado
  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;  // Hacemos el casting explícito
    this.selectedStatus = target.value.toUpperCase();  // Ahora TypeScript sabe que target tiene un 'value'
    this.applyFilter();
    console.log("cambio", this.selectedStatus);
    
  }

  // Aplica el filtro de estado a los chunks
  applyFilter(): void {
    if (this.selectedStatus) {
      this.filteredChunks = this.chunks.filter(chunk => chunk.estado === this.selectedStatus);
    } else {
      this.filteredChunks = [...this.chunks];  // Si no hay filtro, muestra todos
    }
  }

  recibirMensaje(valor: number) {
    console.log("Mensaje del hijo",valor);
  }

  ngOnDestroy(): void {
    if (this.chunksSubscription) {
      this.chunksSubscription.unsubscribe();
    }
  }
}
