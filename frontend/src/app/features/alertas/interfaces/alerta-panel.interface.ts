export interface AlertaPanel {
  id: string;
  titulo: string;
  ubicacion: string;
  tiempo: string;
  tipo: 'robo' | 'accidente' | 'medica' | 'alarma' | 'incendio' | 'intrusion';
  prioridad: 'alta' | 'media' | 'normal';
  estado: 'activa' | 'en_ruta' | 'atendida';
}