import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sseService {

  private eventSource!: EventSource;

  conectarSSE(): Observable<any> {
    return new Observable(observer => {
      this.eventSource = new EventSource('http://localhost:8090/api/v1/sse/documentos');
      
      // Listener para el evento 'documentos'
      this.eventSource.addEventListener('documentos', (event: MessageEvent) => {
        console.log("Raw 'documentos' event data:", event.data);
        const parsedData = JSON.parse(event.data);
        console.log("Parsed data (documentos):", parsedData);
        observer.next(parsedData);
      });

      // Opcional: listener para el evento 'heartbeat'
      this.eventSource.addEventListener('heartbeat', (event: MessageEvent) => {
        console.log("Heartbeat received:", event.data);
      });

      this.eventSource.onerror = error => {
        console.error('Error en SSE', error);
        this.eventSource.close();
        observer.complete();
      };

      return () => this.eventSource.close();
    });
  }
}
