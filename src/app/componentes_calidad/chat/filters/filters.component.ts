import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  showFilters = true;

  users = ['Jack', 'Denis', 'Mateo'];
  chunks = ['chunk1', 'chunk2', 'chunk3'];

  selectedUser: string = '';
  startDate: string = '';
  endDate: string = '';
  question: string = '';
  answer: string = '';
  selectedChunk: string = '';
  selectedValorados: string = '';

  @Output() filtersToggled = new EventEmitter<boolean>(); // Emit a boolean value

  toggleFilters() {
    this.showFilters = !this.showFilters; // Toggle the boolean value
    this.filtersToggled.emit(this.showFilters); // Emit the current state of filters
  }

  applyFilters() {
    const filters = {
      user: this.selectedUser,
      startDate: this.startDate,
      endDate: this.endDate,
      question: this.question,
      answer: this.answer,
      chunk: this.selectedChunk,
      valorados: this.selectedValorados
    };

    console.log('Filters applied:', filters);
  }
}