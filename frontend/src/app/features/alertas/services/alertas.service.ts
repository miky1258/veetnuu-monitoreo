import { Injectable } from '@angular/core';
import { AlertaDetalle } from '../interfaces/alerta-detalle.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  private readonly alertasMock: AlertaDetalle[] = [
    {
      id: 'a1',
      folio: 'Incidente #8291-B',
      titulo: 'Robo a mano armada - Calle Principal',
      descripcion: 'Reportado hace 4 minutos a través de la línea de emergencia 911',
      tipo: 'robo',
      prioridad: 'alta',
      estado: 'en_proceso',
      latitud: 17.0803251,
      longitud: -96.7416772,
      direccion: '1442 Calle Principal Sur',
      ciudad: 'Oaxaca de Juárez, Oax. 68000',
      fechaHoraReporte: '14:32:08',
      lineaReporte: 'Línea de Emergencia 911',
      unidadAsignada: 'EN RUTA - UNIDAD 102',
      autoridadReportante: {
        nombre: 'Oficial Sara Chen',
        identificador: '#SP-8821',
        division: 'División 4',
      },
      actualizaciones: [
        {
          id: 'u1',
          hora: '14:34:12',
          mensaje: 'La Unidad 102 salió de la Estación del Distrito 4.',
          tipo: 'info',
        },
        {
          id: 'u2',
          hora: '14:35:45',
          mensaje:
            'Despacho: "El sujeto fue descrito como masculino, aproximadamente 60 años, chamarra oscura, huyendo a pie con dirección al norte."',
          tipo: 'critico',
        },
      ],
    },
  ];

  obtenerAlertaPorId(id: string): AlertaDetalle | null {
    return this.alertasMock.find((alerta) => alerta.id === id) ?? null;
  }
}