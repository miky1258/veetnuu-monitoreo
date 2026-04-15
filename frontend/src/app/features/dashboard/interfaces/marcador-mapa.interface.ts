export type TipoMarcador = 'robo' | 'accidente' | 'medica' | 'alarma' | 'estacion';

export interface MarcadorMapa {
  id: string;
  titulo: string;
  latitud: number;
  longitud: number;
  tipo: TipoMarcador;
  descripcion?: string;
}