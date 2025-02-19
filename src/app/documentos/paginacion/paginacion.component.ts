import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  imports: [],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Input() paginas!: number;
  pagina: number = 1;

  @Output() eventoHijo = new EventEmitter<number>();

  notificarPadre(valor: number) {
    this.eventoHijo.emit(valor);
  }

  modificarPagina(simbolo: string){
    let valor = this.pagina;
    if (simbolo === '+') {
      valor++;
    } else if (simbolo === '-') {
      valor--;
    }
    this.validarValor(valor);
  }

  private validarValor(valor: number){
    if ( valor < 1 || valor > this.paginas ) {
      return false;
    }
    this.pagina = valor;
    this.notificarPadre(valor);
    return true;
  }

  importarValue(event:Event){
    const input = event.target as HTMLInputElement;
    if (!this.validarValor(Number.parseInt(input.value))) {
      input.value = this.pagina+"";
    }
  }
}
