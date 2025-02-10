import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-etiqueta-search',
  imports: [ReactiveFormsModule],
  templateUrl: './etiqueta-search.component.html',
  styleUrl: './etiqueta-search.component.css'
})
export class EtiquetaSearchComponent {
  @Output() searchTerm = new EventEmitter<string>();
  searchControl: FormControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.searchTerm.emit(value));
  }
}
