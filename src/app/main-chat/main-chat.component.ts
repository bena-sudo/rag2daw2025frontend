import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class MainChatComponent implements OnInit {
  messages: { text: string; sender: string }[] = [];
  newMessage = '';

  constructor(private apiService: ApiService) {} // Inject API service

  ngOnInit() {
    this.loadChatMessages(); // Load chat history on init
  }

  loadChatMessages() {
    this.apiService.getChats().subscribe(
      (chats) => {
        this.messages = chats.map((chat: any) => ({
          text: chat.textoPregunta || chat.text,
          sender: chat.usuario || 'bot' // Default sender if missing
        }));
      },
      (error) => {
        console.error('Error fetching chat messages:', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const userMessage = { text: this.newMessage, sender: 'user' };
      this.messages.push(userMessage);

      this.apiService.createQuestionChat({ textoPregunta: this.newMessage, usuario: 'user' }).subscribe(
        (response) => {
          this.messages.push({ text: response.textoPregunta || '...', sender: 'bot' });
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );

      this.newMessage = '';
    }
  }
}
