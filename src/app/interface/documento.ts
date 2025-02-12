import { EstadoDocumento } from "./EstadoDocumento";

export interface Documento {

    id: number | null;
    idDocRag: number | null;
    idUsuario: number | null;
    nombreFichero: string | null;
    comentario: string | null;
    base64Documento: string | null;
    extensionDocumento: string | null;
    contentTypeDocumento: string | null;
    tipoDocumento: string | null;
    estado: EstadoDocumento | null;
    fechaCreacion: Date | null;
    fechaRevision: Date | null;

}