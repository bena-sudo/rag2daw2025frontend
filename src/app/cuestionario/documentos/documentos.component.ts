import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-documentos",
  templateUrl: "./documentos.component.html",
  styleUrls: ["./documentos.component.css"],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})

export class DocumentosComponent {

  documentosForm: FormGroup;
  selectedFileName: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.documentosForm =  this.formBuilder.group({
      dni:[null],
      vidaLaboral:[null],
      certificado:[null]
    })
  }

  onSubmit() {
    console.log('Form submitted');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      
      const file = input.files[0];

      if (input.id === 'dni') {
        if (file.name.endsWith('.png') || file.name.endsWith('.jpg')) {
          this.selectedFileName = "Formato correcto";
          console.log(input.id);
        } else {
          this.selectedFileName = "El formato del archivo no es correcto";
        }
      } else {
        if (file.name.endsWith('.pdf')) {
          this.selectedFileName = "Formato correcto";
          console.log(input.id);
        } else {
          this.selectedFileName = "El formato del archivo no es correcto";
        }
      }
      console.log(event);
    
      console.log('Selected file:', file.name);
    }
  }

  
}