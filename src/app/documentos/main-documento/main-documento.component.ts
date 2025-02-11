import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-main-documento',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './main-documento.component.html',
  styleUrl: './main-documento.component.css'
})
export class MainDocumentoComponent  implements OnInit{

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
  }

  ngOnInit() : void {
    this.searchForm.get('searchInput')?.valueChanges
    .pipe(
      debounceTime(1000)  // Espera 1 segundo tras el último cambio
    )
    .subscribe();

  }

}
