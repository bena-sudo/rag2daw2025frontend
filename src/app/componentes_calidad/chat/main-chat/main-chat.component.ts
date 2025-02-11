import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service'
import { CommonModule } from '@angular/common';
import { IPregunta } from '../../ipregunta';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class MainChatComponent {
  preguntas: IPregunta[] = [];
  nuevaPregunta = '';

  constructor(private apiService: ApiService) {};

  loadChatMessages() {
    this.apiService.returnPreguntasByIdChat().subscribe(
      page => this.preguntas = page.content,
			error => console.error("Error al conseguir los chats: ", error)
    );
  }

  /*
  sendMessage() {
    if (this.nuevaPregunta.trim() !== '') {
      const userMessage: IPregunta = {};
      userMessage
      this.preguntas.push(userMessage);

      this.apiService.createQuestionChat({ textoPregunta: this.nuevaPregunta, usuario: 'user' }).subscribe(
        (response) => {
          this.preguntas.push({ text: response.textoPregunta || '...', sender: 'bot' });
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );

      this.nuevaPregunta = '';
    }
  }*/
}
