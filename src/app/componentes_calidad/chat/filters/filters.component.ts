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
  selectedValor: string = '';

  constructor(private apiService: ApiService) {};

  ngOnInit() {
    this.iniciarListaNombres();
    this.apply = document.getElementById("apply-filters");
  }

  

  iniciarListaNombres() {
    this.apiService.getListUsuarios().subscribe( 
      list => this.users = list,
      error => console.error("Error al conseguir los usuarios: ", error)
    );
  }



  @Output() filtersToggled = new EventEmitter<boolean>();

  toggleFilters() {
    this.showFilters = !this.showFilters; 
    this.filtersToggled.emit(this.showFilters);
  }

  applyFilters() {
    const filters = {
      user: this.selectedUser,
      startDate: this.startDate,
      endDate: this.endDate,
      question: this.question,
      answer: this.answer,
      chunk: this.selectedChunk,
      valorados: this.selectedValorados,
      valor: this.selectedValor
    };

    console.log('Filters applied:', filters);
  }
}

