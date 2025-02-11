export enum Estado {
    APROBADO = 'APROBADO',
    DENEGADO = 'DENEGADO',
    PENDIENTE = 'PENDIENTE',
}

export const EstadoColor: Record<Estado, string> = {
    [Estado.APROBADO]: 'green',
    [Estado.DENEGADO]: 'red',
    [Estado.PENDIENTE]: 'orange',
};