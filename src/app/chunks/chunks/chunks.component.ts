import { Component, Input } from '@angular/core';
import { ChunksService } from '../../service/chunks.service';
import { Observable, Subscription, switchMap, takeUntil } from 'rxjs';
import { ChunkListComponent } from "../chunk-list/chunk-list.component";
import { Estado } from '../../enums/estado.enum';
import { PaginacionComponent } from "../../documentos/paginacion/paginacion.component";
import { Chunk } from '../chunk';

@Component({
  selector: 'app-chunks',
  imports: [ChunkListComponent, PaginacionComponent],
  templateUrl: './chunks.component.html',
  styleUrl: './chunks.component.css'
})
export class ChunksComponent {
  @Input() documentoId!: number;  // ID del documento
  chunks: any[] = [];  // Todos los chunks
  filteredChunks: any[] = [];  // Chunks filtrados
  selectedStatus: string = '';  // Estado seleccionado para el filtro
  estados = Object.values(Estado);
  private chunksSubscription?: Subscription;
  private paginaAct: number = 1;
  private tamanoPagina: number = 6;
  paginas: number = 0;

  mensajeError: string = "";

  reiniciar: boolean = true;

  constructor(private chunkService: ChunksService) {}

  ngOnInit(): void {
    this.documentoId = 2;
    this.modificarLista(()=>{});
    this.modificarListaFiltrada();
  }

  fetchChunks(pagina: number, tamano: number, filter: string = ""): Observable<any> {
    return this.chunkService.getChunksByDocumentId(pagina - 1, tamano, this.documentoId,filter).pipe(
      switchMap(chunks => {
        // Solo devuelve los chunks sin modificar las variables globales
        return new Observable<any>(observer => {
          observer.next(chunks);
          observer.complete();
        });
      })
    );
  }
  
  modificarLista(callback: Function,filter: string = "" , tamanoPagina: number = 1000) {
    if (this.documentoId === undefined) {
      this.mensajeError = "No se ha proporcionado ID del documento o no se ha importado correctamente";
      console.error(this.mensajeError);
      return;
    } else {
      this.mensajeError = "";
    }
    this.fetchChunks(this.paginaAct,tamanoPagina,filter).subscribe(chunks => {
      this.chunks = chunks.content;
      this.paginas = chunks.totalPages;
      
      this.chunks.forEach(chunk => chunk.idDocumento = this.documentoId);
      callback();
      //this.applyFilter();
      //this.filteredChunks = this.chunks;
    });
  }

  modificarListaFiltrada(filter: string = "" , tamanoPagina: number = this.tamanoPagina) {
    if (this.documentoId === undefined) {
      this.mensajeError = "No se ha proporcionado ID del documento o no se ha importado correctamente";
      console.error(this.mensajeError);
      return;
    } else {
      this.mensajeError = "";
    }
    this.fetchChunks(this.paginaAct,tamanoPagina,filter).subscribe(chunks => {
      this.filteredChunks = chunks.content;
      this.paginas = chunks.totalPages;
      
      this.filteredChunks.forEach(chunk => chunk.idDocumento = this.documentoId);
    });
  }

  // Maneja el cambio del filtro de estado
  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value.toUpperCase();
    this.actualizarChunks();
    this.paginaAct = 1;
    this.reiniciarComponente();
  }

  reiniciarComponente() {
    this.reiniciar = false;
    setTimeout(() => {
      this.reiniciar = true;
    }, 0); // Un pequeño delay para forzar la actualización del componente
  }

  updatePagina(valor: number) {
    this.paginaAct = valor;
    this.actualizarChunks();
  }

  aprobarChunks(chunks: Chunk[]) {
    chunks.forEach(chunk=>{
      chunk.estado = Estado.APROBADO;
      this.chunkService.updateChunk(chunk).subscribe({
        next: () => {
          this.actualizarChunks();
        },
        error: (err) => console.error('Error al actualizar el chunk ',chunk.id,": ", err)
      });
    });
    
  }

  actualizarChunks(){
    if (this.selectedStatus) {
      this.modificarListaFiltrada("&filter=estado:IGUAL:"+this.selectedStatus);
    } else {
      this.modificarListaFiltrada();
    }
  }

  aprobarTo(){
    const confirmacion = window.confirm("¿Estás seguro de que quieres aprobar todos los chunks (en estado pendiente)?");
    if (confirmacion) {
      this.modificarLista(()=>{
        const chunksPendientes = this.chunks.filter(chunk=>chunk.estado === "PENDIENTE");
        if (chunksPendientes.length == 0) {
          console.log("No hay en estado pendiente");
        } else {
          console.log("Se van a modificar ",chunksPendientes.length);
        }
        this.aprobarChunks(chunksPendientes);
      });
    }
  }

  enviarTo(){
    this.modificarLista(()=>{
      const chunksPendientes = this.chunks.filter(chunk=>chunk.estado === "PENDIENTE").length;
      if ( chunksPendientes !== 0) {
        window.alert(`Todavia hay ${chunksPendientes} chunks pendientes`);
        return;
      }
      const confirmacion = window.confirm("¿Estás seguro de que quieres enviar definitivamente todos los chunks aprobados?");
      if (confirmacion) {
        this.chunks.filter(chunk=>chunk.estado === "APROBADO").forEach(chunk=>{
          this.chunkService.enviarChunk(chunk).subscribe({
            next: (mensaje) => {
              console.log("Mensaje recibido: ",mensaje);
            },
            error: (err) => console.error('Error al actualizar el chunk ',chunk.id,": ", err)
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chunksSubscription) {
      this.chunksSubscription.unsubscribe();
    }
  }
}
