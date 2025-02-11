import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class MainChatComponent implements OnChanges{
  preguntas: IPregunta[] = [];
  nuevaPregunta = '';

  constructor(private apiService: ApiService) {};

  @Input() idChat: number = 1;
  ngOnChanges(changes: SimpleChanges): void {
    this.apiService.returnPreguntasByIdChat(this.idChat).subscribe(
      listaPreguntas => this.preguntas = listaPreguntas,
			error => console.error("Error al conseguir las preguntas del chat" + this.idChat + ": ", error)
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
