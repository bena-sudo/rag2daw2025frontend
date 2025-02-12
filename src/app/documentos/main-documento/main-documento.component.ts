import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { EtiquetasListComponent } from '../etiquetas-list/etiquetas-list.component';

@Component({
  selector: 'app-main-documento',
  imports: [ReactiveFormsModule, CommonModule, EtiquetasListComponent],
  templateUrl: './main-documento.component.html',
  styleUrl: './main-documento.component.css',
})
export class MainDocumentoComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm
      .get('searchInput')
      ?.valueChanges.pipe(
        debounceTime(1000) // Espera 1 segundo tras el último cambio
      )
      .subscribe(); //SERVICE
  }
}
