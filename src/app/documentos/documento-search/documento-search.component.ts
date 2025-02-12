import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-documento-search',
  imports: [ReactiveFormsModule],
  templateUrl: './documento-search.component.html',
  styleUrl: './documento-search.component.css'
})
export class DocumentoSearchComponent {
  @Output() searchTerm = new EventEmitter<string>();
  searchControl: FormControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.searchTerm.emit(value));
  }
}
