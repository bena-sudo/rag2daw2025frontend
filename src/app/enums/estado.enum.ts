export enum Estado {
    APROBADO = 'APROBADO',
    DENEGADO = 'DENEGADO',
    PENDIENTE = 'PENDIENTE',
    //EDITANDO = 'EDITANDO'
}

export const EstadoColor: Record<Estado, string> = {
    [Estado.APROBADO]: 'green',
    [Estado.DENEGADO]: 'red',
    [Estado.PENDIENTE]: 'orange',
    //[Estado.EDITANDO]: 'yellow',
};