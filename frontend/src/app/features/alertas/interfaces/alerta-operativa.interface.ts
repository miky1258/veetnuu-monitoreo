export interface AlertaOperativa {
  id: string;
  folio: string;
  titulo: string;
  descripcion: string;
  tipo: 'robo' | 'accidente' | 'medica' | 'alarma' | 'incendio' | 'intrusion';
  prioridad: 'alta' | 'media' | 'normal';
  estado: 'activa' | 'en_ruta' | 'atendida' | 'en_proceso';
  latitud: number;
  longitud: number;
  ubicacion: string;
  ciudad: string;
  hora: string;
  autoridad: string;
}