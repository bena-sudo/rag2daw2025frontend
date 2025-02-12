export interface Documento {
    id?: number; // El ID puede ser opcional si es autogenerado
    idDocRag?: number;
    idUsuario: number;
    nombreFichero: string;
    comentario?: string;
    base64Documento: string;
    extensionDocumento?: string;
    contentTypeDocumento?: string;
    tipoDocumento?: string;
    estado?: EstadoDocumento; // Enum
    fechaCreacion?: string; // Fechas generalmente se manejan como strings en JSON
    fechaRevision?: string;
  }
  
  // Enum para EstadoDocumento, según la definición en la clase original
  export enum EstadoDocumento {
    PENDIENTE = 'PENDIENTE',
    APROBADO = 'APROBADO',
    DENEGADO = 'DENEGADO'
  }
  