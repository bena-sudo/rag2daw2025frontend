import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EnviarFitrosService {

	private filtroSource = new BehaviorSubject<object | null>(null);

	filtros$ = this.filtroSource.asObservable();

	actualizarFiltros(bodyFiltros: object) {
		this.filtroSource.next(bodyFiltros);
	}
}
