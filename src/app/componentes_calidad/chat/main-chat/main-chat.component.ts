import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service'
import { CommonModule } from '@angular/common';
import { IPregunta } from '../../ipregunta';
import { IBodyEnvioPregunta } from './ibodyenviopregunta';

@Component({
	selector: 'app-main-chat',
	templateUrl: './main-chat.component.html',
	styleUrls: ['./main-chat.component.css'],
	standalone: true,
	imports: [FormsModule, CommonModule]
})
export class MainChatComponent implements OnChanges{
	preguntas: IPregunta[] = [];
	textoPregunta: string = '';
	usuario = "usuarioAngular";

	constructor(private apiService: ApiService) {};

	// funcion que toma el id del chat al que se ha hecho click
	@Input() idChat: number = -1;
	ngOnChanges(changes: SimpleChanges): void {
		this.actualizarChat();
	}

	// con el id del chat cambia el contenido a las preguntas
	actualizarChat() {
		if (this.idChat == -1)
			return;
		
		this.apiService.returnPreguntasByIdChat(this.idChat).subscribe(
			listaPreguntas => this.preguntas = this.invertir_lista(listaPreguntas),
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
		);
	}

	// invierte la lista para que se vea el scroll desde abajo
	invertir_lista(lista: IPregunta[]): IPregunta[] {
		return lista.sort((a, b):any => {
			return b.idPregunta - a.idPregunta;
		})
	}
	
	// funcion que crea la pregunta
	crearMensaje() {
		let cuerpoPregunta: IBodyEnvioPregunta = {
			idChat: this.idChat,
			usuario: this.usuario,
			textoPregunta: this.textoPregunta,
		};
		this.enviarMensaje(cuerpoPregunta);
		this.textoPregunta = '';
	}

	// funcion que envia el body de la pregunta al back
	enviarMensaje(body: IBodyEnvioPregunta) {
		this.apiService.createQuestionChat(body).subscribe(
			response => this.actualizarChat(),
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
		);
	}

	// funcion que cambia el feedback de la respuesta a bien
	valorarBien(pregunta: IPregunta) {
		pregunta.feedback = "BIEN";
		this.valorarPregunta(pregunta);
	}

	// funcion que cambia el feedback de la respuesta a mal
	valorarMal(pregunta: IPregunta) {
		pregunta.feedback = "MAL";
		this.valorarPregunta(pregunta);
	}

	// funcion que cambia el feedback de la pregunta en el back
	valorarPregunta(pregunta: IPregunta) {
		pregunta.valorado = true;
		pregunta.idChat = this.idChat
		this.apiService.updateQuestion(pregunta.idPregunta, pregunta).subscribe(
			response => console.log(response),
			error => console.error("Error al valorar la pregunta" + this.idChat + ": ", error)
		);
	}
}
