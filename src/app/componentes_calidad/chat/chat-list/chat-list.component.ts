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
		this.loadBasicChats();
	}

	loadBasicChats() {
		this.apiService.getChats().subscribe( 
			page => this.chats = page.content,
			error => console.error("Error al conseguir los chats: ", error)
		);
	}

	@Output() seleccionarChat = new EventEmitter<number>();
	onItemClick(idChat: number) {
		this.seleccionarChat.emit(idChat);
	}
}