import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css']
})
export class MainChatComponent {
  messages = [
    { text: 'Hello!', sender: 'user' }, 
    { text: 'Hi, how are you?', sender: 'bot' } 
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, sender: 'user' }); // Add user message
      this.newMessage = '';

      setTimeout(() => {
        this.messages.push({ text: 'I am fine, thank you!', sender: 'bot' }); // Add bot message
      }, 1000);
    }
  }
}