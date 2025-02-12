import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IChat } from '../../ichat';
import { ApiService } from '../../../service/service';
import { EnviarFitrosService } from '../enviar-fitros.service';


@Component({
  selector: 'app-chat-list',
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
	chats: IChat[] = [];

	constructor(
		private apiService: ApiService,
		private enviarFiltrosService: EnviarFitrosService 
	) {};

	ngOnInit() {
		this.cargarChats();
		this.suscripcionFiltros();
	}

	cargarChats() {
		this.apiService.getChats().subscribe( 
			page => this.chats = page.content,
			error => console.error("Error al conseguir los chats: ", error)
		);
	}

	@Output() seleccionarChat = new EventEmitter<number>();
	onItemClick(idChat: number) {
		this.seleccionarChat.emit(idChat);
	}

	suscripcionFiltros() {
		this.enviarFiltrosService.filtros$.subscribe( bodyFiltros => {
			this.apiService.filterChats(bodyFiltros).subscribe( 
				page => {
					this.chats = page.content;
					console.log(bodyFiltros);
				},
				error => console.error("Error al conseguir los usuarios: ", error)
			  );
		})
	}

	borrarChat(idChat: number) {
		this.apiService.deleteChat(idChat).subscribe( 
			response => this.cargarChats(),
			error => console.error("Error al conseguir los chats: ", error)
		);
	}

	jsonIniciarChat = {
		"usuario": "usuarioAngular",
    	"contexto": 1
	};
	iniciarChat() {
		this.apiService.createChat(this.jsonIniciarChat).subscribe( 
			response => {
				this.cargarChats()
			},
			error => console.error("Error al conseguir los chats: ", error)
		);
	}

	
}