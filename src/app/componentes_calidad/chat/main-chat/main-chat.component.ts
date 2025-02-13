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

	@Input() idChat: number = 0;
	ngOnChanges(changes: SimpleChanges): void {
		this.actualizarChat();
	}

	actualizarChat() {
		this.apiService.returnPreguntasByIdChat(this.idChat).subscribe(
			listaPreguntas => this.preguntas = this.invertir_lista(listaPreguntas),
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
		);
	}

	invertir_lista(lista: IPregunta[]): IPregunta[] {
		return lista.sort((a, b):any => {
			return b.idPregunta - a.idPregunta;
		})
	}
	
	// Metodos que crean y envian el mensaje a la api
	crearMensaje() {
		let cuerpoPregunta: IBodyEnvioPregunta = {
			idChat: this.idChat,
			usuario: this.usuario,
			textoPregunta: this.textoPregunta,
		};
		this.enviarMensaje(cuerpoPregunta);
		this.textoPregunta = '';
	}

	enviarMensaje(body: IBodyEnvioPregunta) {
		this.apiService.createQuestionChat(body).subscribe(
			response => this.actualizarChat(),
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
		);
	}

	// Metodos para valorar respuestas
	valorarBien(pregunta: IPregunta) {
		pregunta.feedback = "BIEN";
		console.log(pregunta);
		this.valorarPregunta(pregunta);
	}

	valorarMal(pregunta: IPregunta) {
		pregunta.feedback = "MAL";
		this.valorarPregunta(pregunta);
	}

	valorarPregunta(pregunta: IPregunta) {
		pregunta.valorado = true;
		pregunta.idChat = this.idChat
		this.apiService.updateQuestion(pregunta.idPregunta, pregunta).subscribe(
			response => console.log(response),
			error => console.error("Error al valorar la pregunta" + this.idChat + ": ", error)
		);
	}
}
