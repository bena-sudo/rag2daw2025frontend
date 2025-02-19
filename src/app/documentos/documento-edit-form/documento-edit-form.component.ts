import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentosService } from '../../service/documentos.service';
import { Documento } from '../../interface/documento';
import { Router } from '@angular/router';
import { EtiquetasService } from '../../service/etiquetas.service';

@Component({
  selector: 'app-documento-edit-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './documento-edit-form.component.html',
  styleUrl: './documento-edit-form.component.css'
})
export class DocumentoEditFormComponent implements OnInit {

  @Input('id') documentoID!: string;
  editForm: FormGroup;
  documentoOriginal!: Documento;
  estado: String = '';
  etiquetasDisponibles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentosService,
    private router: Router,
    private etiquetasService: EtiquetasService,
  ) {
    this.editForm = this.formBuilder.group({
      nombreFichero: ['', [Validators.required]],
      comentario: [''],
      etiquetas: this.formBuilder.array([])
    });
  }

  get etiquetasArray(): FormArray {
    return this.editForm.get('etiquetas') as FormArray;
  }

  getEtiquetaControl(valor: string = ''): FormControl {
    return this.formBuilder.control(valor, Validators.required);
  }

  addEtiqueta(valor: string = '') {
    this.etiquetasArray.push(this.getEtiquetaControl(valor));
  }

  delEtiqueta(i: number) {
    this.etiquetasArray.removeAt(i);
  }

  get nombreValid() {
    const control = this.editForm.get('nombreFichero');
    return control?.touched && !control.valid;
  }

  submitForm() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      console.log('Formulario no válido');
      return;
    }

    const documento: Documento = {
      id: Number.parseInt(this.documentoID),
      ...this.editForm.value,
      estado: this.documentoOriginal.estado,
      idUsuario: 1,
      etiquetas: this.etiquetasArray.value.map((etiqueta: string) => ({ id: etiqueta }))
    };

    console.log('Enviando documento actualizado:', documento);

    this.documentService.updateDocumento(documento).subscribe({
      next: (updatedDoc) => {
        console.log('Documento actualizado:', updatedDoc);
        this.editForm.reset();
      },
      error: (err) => {
        console.error('Error al actualizar el documento:', err);
        this.router.navigate(['/editForm', documento.id]);
      },
      complete: () => {
        console.log('Actualización completada.');
        this.router.navigate(['/documento', documento.id]);
      },
    });
  }

  ngOnInit(): void {
    this.cargarEtiquetas();
    this.documentService.searchDocumentoById(Number.parseInt(this.documentoID)).subscribe({
      next: (documento) => {
        console.log('Documento encontrado:', documento);
        this.documentoOriginal = documento;
        this.editForm.patchValue({
          nombreFichero: documento.nombreFichero,
          comentario: documento.comentario || ''
        });
        if (documento.etiquetas) {
          documento.etiquetas.forEach((etiqueta: any) => {
            this.addEtiqueta(etiqueta.id);
          });
        }
      },
      error: (err) => console.error('Error al buscar el documento:', err)
    });
  }

  cargarEtiquetas() {
    this.etiquetasService.getEtiquetas().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.content)) {
          this.etiquetasDisponibles = response.content;
          console.log('Etiquetas disponibles:', this.etiquetasDisponibles);
        } else {
          console.error('❌ Respuesta inesperada:', response);
        }
      },
      error: (error) => console.error('❌ Error al cargar etiquetas:', error)
    });
  }
}
