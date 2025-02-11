import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IChat } from '../../ichat';
import { ApiService } from '../../../service/service';

@Component({
  selector: 'app-chat-list',
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
	chats: IChat[] = [];

	constructor(private apiService: ApiService) {};

	ngOnInit() {
		this.cargarChats();
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