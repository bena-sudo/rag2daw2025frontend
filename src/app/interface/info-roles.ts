import { InfoPermisos } from "./info-permisos";

//Interfaz para los roles
export interface InfoRoles {

    id: number;
    nombre: string;
    permisos?: InfoPermisos[];
}