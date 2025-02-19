import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service'
import { CommonModule } from '@angular/common';
import { IPregunta } from '../../ipregunta';
import { IBodyEnvioPregunta } from './ibodyenviopregunta';
import { SseService } from '../../../service/sse-service.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main-chat',
	templateUrl: './main-chat.component.html',
	styleUrls: ['./main-chat.component.css'],
	standalone: true,
	imports: [FormsModule, CommonModule]
})
export class MainChatComponent implements OnChanges, OnInit{
	preguntas: IPregunta[] = [];
	textoPregunta: string = '';
	usuario = "usuarioAngular";
	indice = 0;

	constructor(
		private apiService: ApiService, 
		private sseService: SseService,
		private cd: ChangeDetectorRef
	) {}
	
	ngOnInit(): void {
		let bodyPrueba: {feedback: string, idChat: number, idPregunta: number, textoPregunta: string, textoRespuesta: string,usuario: string, valorado: boolean
		} = {
			feedback: "NORMAL",
			idChat: 6,
			idPregunta: 63,
			textoPregunta: "ffdg",
			textoRespuesta: "Simulación de respuesta. Esto es una simulación para comprobar si realmente funciona el flujo que hemos incorporado en el backend y el SSE que hay en el frontend.",
			usuario: "usuarioAngular",
			valorado: false,
		}

		this.apiService.updateQuestion(bodyPrueba.idPregunta, bodyPrueba);
	};

	

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
			listaPreguntas => {this.preguntas = this.invertir_lista(listaPreguntas)},
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
			response => {
				this.actualizarChat(),
				this.responder()
			},
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



	/* Flujo de respuestas */
	idPregunta: number = 1;
	private sseSubscription!: Subscription;
	iteracionEnvioRespuesta: number = 0;

	responder(): void {
		this.sseService.connectToSse(this.idPregunta);
	
		this.sseSubscription = this.sseService.messages$.subscribe({
		  	next: (message) => {
				const char = JSON.parse(message);

				if (char === '\u0003') {
					this.sseService.disconnectFromSse();
					this.sseSubscription.unsubscribe();
				} else {
					this.preguntas[0].textoRespuesta += char;
					this.cd.detectChanges();
					this.iteracionEnvioRespuesta++;
				}

				if (this.iteracionEnvioRespuesta === 10) {
					this.preguntas[0].idChat = this.idChat;
					this.apiService.updateQuestion(this.preguntas[0].idPregunta, this.preguntas[0]);
					this.iteracionEnvioRespuesta = 0;
				}
		  	},
		  error: (err) => console.error('Error SSE:', err)
		});
	}

	ngOnDestroy(): void {
		this.sseService.disconnectFromSse();
		if (this.sseSubscription) {
		  this.sseSubscription.unsubscribe();
		}
	}
}
