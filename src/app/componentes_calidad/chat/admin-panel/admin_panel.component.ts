import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../componentes_global/footer/footer.component";
import { HeaderComponent } from "../../../componentes_global/header/header.component";
import { ChatListComponent } from '../chat-list/chat-list.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { FiltersComponent } from "../filters/filters.component";
import { NgStyle } from '@angular/common';
import { ApiService } from '../../../service/service';
@Component({
  selector: 'app-root',
  imports: [NgStyle,  FooterComponent, HeaderComponent, ChatListComponent, MainChatComponent, FiltersComponent],
  templateUrl: './admin_panel.component.html',
  styleUrl: './admin_panel.component.css'
})
export class AppComponent {
  title = 'rag2daw2025frontend';
  chatContainerHeight = '75.8vh';
  chatListWidth = 300;
  isResizing = false;

  
  onFiltersToggled(showFilters: boolean) {
    this.chatContainerHeight = showFilters ? '75.8vh' : '87vh'; // Adjust height based on filters visibility
  }

  startResizing(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const newWidth = event.clientX; 
    this.chatListWidth = newWidth;

    if (this.chatListWidth < 200) this.chatListWidth = 200;
    if (this.chatListWidth > 600) this.chatListWidth = 600;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  idChatSeleccionado: number | null = null;
  alSeleccionarChat(idChat: number) {
    this.idChatSeleccionado = idChat;
  }
}
