export enum Estado {
    APROBADO = 'APROBADO',
    DENEGADO = 'DENEGADO',
    PENDIENTE = 'PENDIENTE',
    CHUNKED = 'CHUNKED'
}

export const EstadoColor: Record<Estado, string> = {
    [Estado.APROBADO]: 'green',
    [Estado.DENEGADO]: 'red',
    [Estado.PENDIENTE]: 'orange',
    [Estado.CHUNKED]: 'var(--azul-medio)',
};