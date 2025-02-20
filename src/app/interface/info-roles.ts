import { InfoPermisos } from "./InfoPermisos";

//Interfaz para los roles
export interface InfoRoles {

    id: number;
    nombre: string;
    permisos?: InfoPermisos[];
}