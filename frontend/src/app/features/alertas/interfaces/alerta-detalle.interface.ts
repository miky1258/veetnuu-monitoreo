export interface ActualizacionAlerta {
  id: string;
  hora: string;
  mensaje: string;
  tipo: 'info' | 'critico';
}

export interface AutoridadReportante {
  nombre: string;
  identificador: string;
  division: string;
}

export interface AlertaDetalle {
  id: string;
  folio: string;
  titulo: string;
  descripcion: string;
  tipo: 'robo' | 'accidente' | 'medica' | 'alarma';
  prioridad: 'alta' | 'media' | 'normal';
  estado: 'pendiente' | 'en_proceso' | 'resuelta';
  latitud: number;
  longitud: number;
  direccion: string;
  ciudad: string;
  fechaHoraReporte: string;
  lineaReporte: string;
  unidadAsignada?: string;
  autoridadReportante: AutoridadReportante;
  actualizaciones: ActualizacionAlerta[];
}