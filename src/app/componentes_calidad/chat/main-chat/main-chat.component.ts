import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service'
import { CommonModule } from '@angular/common';
import { IPregunta } from '../../ipregunta';
import { IBodyPregunta } from './ibodypregunta';

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

	@Input() idChat: number | null = 0;
	ngOnChanges(changes: SimpleChanges): void {
		this.apiService.returnPreguntasByIdChat(this.idChat).subscribe(
			listaPreguntas => this.preguntas = listaPreguntas,
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
		);
	}
	
	// Metodos que crean y envian el mensaje a la api
	crearMensaje() {
		let cuerpoPregunta: IBodyPregunta = {
			idChat: this.idChat,
			usuario: this.usuario,
			textoPregunta: this.textoPregunta,
		};
		this.enviarMensaje(cuerpoPregunta);
	}

	enviarMensaje(body: IBodyPregunta) {
		this.apiService.createQuestionChat(body).subscribe(
			response => console.log(response),
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
		);
	}
}
