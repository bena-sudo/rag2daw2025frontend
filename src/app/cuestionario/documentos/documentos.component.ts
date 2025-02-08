import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DocumentosService } from "../../services/documentos.service";

@Component({
  selector: "app-documentos",
  templateUrl: "./documentos.component.html",
  styleUrls: ["./documentos.component.css"],
})
export class DocumentosComponent implements OnInit {
  @Input() idUsuario?: number;
  documentosForm: FormGroup;
  archivoSeleccionado: File | null = null; // Variable para almacenar el archivo cargado

  constructor(private documentoService: DocumentosService, private formBuilder: FormBuilder) {
    this.documentosForm = this.formBuilder.group({
      documentos: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    if (this.idUsuario) {
      this.cargarDocumentos();
    } else {
      console.warn("No hay un usuario autenticado");
    }
  }

  cargarDocumentos(): void {
    if (!this.idUsuario) return;

    this.documentoService.getDocumentosById(this.idUsuario).subscribe({
      next: (data) => {
        this.documentosForm.setControl(
          "documentos",
          this.formBuilder.array(data.map((doc: any) => this.generateDocumentoControl(doc)))
        );
      },
      error: (err) => console.error("Error al obtener documentos:", err),
    });
  }

  generateDocumentoControl(doc: any): FormGroup {
    return this.formBuilder.group({
      id: [doc.id],
      nombre: [doc.nombre, Validators.required],
      tipo: [doc.nombre.endsWith(".pdf") ? "pdf" : "imagen"],
      url: [`http://localhost:8080/documentos/${doc.id}`],
    });
  }

  get documentosArray(): FormArray {
    return this.documentosForm.get("documentos") as FormArray;
  }

  // Función para manejar el archivo cargado
  cargarArchivo(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;

      // Añadir archivo temporalmente a la lista antes de enviarlo
      const nuevoDoc = this.formBuilder.group({
        id: [null], // Temporalmente sin ID
        nombre: [file.name, Validators.required],
        tipo: [file.name.endsWith(".pdf") ? "pdf" : "imagen"],
        url: ["#"], // No tiene URL aún
      });

      this.documentosArray.push(nuevoDoc);
    }
  }

  enviarDocumento(): void {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append("file", this.archivoSeleccionado);
      formData.append("idUsuario", this.idUsuario?.toString() || "");

      this.documentoService.subirDocumento(formData).subscribe({
        next: (response) => {
          console.log("Documento enviado correctamente:", response);
          this.cargarDocumentos(); // Recargar documentos después de enviarlo
          this.archivoSeleccionado = null; // Limpiar archivo cargado
        },
        error: (err) => {
          console.error("Error al enviar el documento:", err);
        },
      });
    }
  }
}
