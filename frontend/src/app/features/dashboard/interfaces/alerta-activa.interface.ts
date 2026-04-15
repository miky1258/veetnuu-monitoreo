export type PrioridadAlerta = 'alta' | 'media' | 'normal';
export type TipoAlerta = 'robo' | 'accidente' | 'medica' | 'alarma';

export interface AlertaActiva {
  id: string;
  titulo: string;
  descripcion: string;
  tiempo: string;
  prioridad: PrioridadAlerta;
  tipo: TipoAlerta;
  latitud?: number;
  longitud?: number;
}