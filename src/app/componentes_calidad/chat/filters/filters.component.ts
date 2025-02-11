import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  showFilters = true;
  apply: any;

  users: string[] = [];
  chunks = ['chunk1', 'chunk2', 'chunk3'];
  
  selectedUser: string = '';
  startDate: string = '';
  endDate: string = '';
  question: string = '';
  answer: string = '';
  selectedChunk: string = '';
  selectedValorados: string = '';

  constructor(private apiService: ApiService) {};

  ngOnInit() {
    this.iniciarListaNombres();
    this.apply = document.getElementById("apply-filters");
  }

  //@HostListener función para aplicar y enviar los filtros seleccionados al backend y devolver los usuarios que cumplen con los criterios.
  

  iniciarListaNombres() {
    this.apiService.getListUsuarios().subscribe( 
      list => this.users = list,
      error => console.error("Error al conseguir los usuarios: ", error)
    );
  }



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

