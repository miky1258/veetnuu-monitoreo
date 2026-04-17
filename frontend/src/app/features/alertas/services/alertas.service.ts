import { Injectable } from '@angular/core';
import { AlertaDetalle } from '../interfaces/alerta-detalle.interface';
import { AlertaPanel } from '../interfaces/alerta-panel.interface';
import { AlertaHistorial } from '../interfaces/alerta-historial.interface';
import { ResumenAlertas } from '../interfaces/resumen-alertas.interface';
import { AlertaOperativa } from '../interfaces/alerta-operativa.interface';
import { AlertaActiva } from '../../dashboard/interfaces/alerta-activa.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  private readonly alertasBase: AlertaOperativa[] = [
    {
      id: 'a1',
      folio: 'Incidente #8291-B',
      titulo: 'Robo a mano armada - Calle Principal',
      descripcion:
        'Reportado hace 4 minutos a través de la línea de emergencia 911',
      tipo: 'robo',
      prioridad: 'alta',
      estado: 'en_proceso',
      latitud: 17.0803251,
      longitud: -96.7416772,
      ubicacion: '1442 Calle Principal Sur',
      ciudad: 'Oaxaca de Juárez, Oax. 68000',
      hora: '14:32:08',
      autoridad: 'Oficial Sara Chen',
    },
    {
      id: 'a2',
      folio: 'Incidente #8304-C',
      titulo: 'Incendio estructural - Sector 4C',
      descripcion: 'Reporte de incendio activo en bodega industrial.',
      tipo: 'incendio',
      prioridad: 'alta',
      estado: 'en_ruta',
      latitud: 17.0738,
      longitud: -96.7265,
      ubicacion: 'Parque Industrial, Bodega 5',
      ciudad: 'Oaxaca de Juárez, Oax.',
      hora: '02:14',
      autoridad: 'Central de Despacho',
    },
    {
      id: 'a3',
      folio: 'Incidente #8309-A',
      titulo: 'Colisión múltiple de vehículos',
      descripcion: 'Accidente con múltiples vehículos y obstrucción parcial.',
      tipo: 'accidente',
      prioridad: 'alta',
      estado: 'activa',
      latitud: 17.0651,
      longitud: -96.7159,
      ubicacion: 'Carretera Federal 190, salida 22',
      ciudad: 'Oaxaca de Juárez, Oax.',
      hora: '12:45',
      autoridad: 'Unidad de Tránsito',
    },
    {
      id: 'a4',
      folio: 'Incidente #8315-D',
      titulo: 'Acceso no autorizado detectado',
      descripcion: 'Se detectó movimiento no autorizado en zona restringida.',
      tipo: 'intrusion',
      prioridad: 'media',
      estado: 'activa',
      latitud: 17.0715,
      longitud: -96.7332,
      ubicacion: 'Laboratorio R&D, Sala de Servidores',
      ciudad: 'Oaxaca de Juárez, Oax.',
      hora: '07:40:12',
      autoridad: 'Sistema de Seguridad',
    },
    {
      id: 'a5',
      folio: 'Incidente #8318-E',
      titulo: 'Sensor de humo activado',
      descripcion: 'Alerta de humo en área de cocina.',
      tipo: 'alarma',
      prioridad: 'normal',
      estado: 'atendida',
      latitud: 17.0689,
      longitud: -96.7297,
      ubicacion: 'Cafetería, Área de Cocina',
      ciudad: 'Oaxaca de Juárez, Oax.',
      hora: '06:58:14',
      autoridad: 'Sistema contra incendios',
    },
  ];

  obtenerAlertasDashboard(): AlertaActiva[] {
    return this.alertasBase.map((alerta) => ({
      id: alerta.id,
      titulo: alerta.titulo,
      descripcion: alerta.descripcion,
      tiempo: alerta.hora,
      prioridad: alerta.prioridad,
      tipo:
        alerta.tipo === 'incendio' || alerta.tipo === 'intrusion'
          ? 'alarma'
          : alerta.tipo,
      latitud: alerta.latitud,
      longitud: alerta.longitud,
    }));
  }

  obtenerIncidentesCriticos(): AlertaPanel[] {
    return this.alertasBase
      .filter((alerta) => alerta.prioridad === 'alta')
      .map((alerta) => ({
        id: alerta.id,
        titulo: alerta.titulo,
        ubicacion: alerta.ubicacion,
        tiempo: alerta.hora,
        tipo: alerta.tipo,
        prioridad: alerta.prioridad,
        estado:
          alerta.estado === 'en_proceso' ? 'activa' : (alerta.estado as 'activa' | 'en_ruta' | 'atendida'),
      }));
  }

  obtenerHistorialAlertas(): AlertaHistorial[] {
    return this.alertasBase.map((alerta) => ({
      id: alerta.id,
      codigo: alerta.folio,
      incidente: alerta.titulo,
      tipo: alerta.tipo,
      ubicacion: alerta.ubicacion,
      severidad: alerta.prioridad,
      estado:
        alerta.estado === 'en_proceso' ? 'activa' : alerta.estado,
      hora: alerta.hora,
    }));
  }

  obtenerResumenAlertas(): ResumenAlertas {
    const total = this.alertasBase.length;
    const totalAtendidas = this.alertasBase.filter(
      (alerta) => alerta.estado === 'atendida'
    ).length;

    return {
      totalAlertas24h: total,
      tiempoPromedioRespuesta: '4m 12s',
      tasaResolucion: total > 0 ? Number(((totalAtendidas / total) * 100).toFixed(1)) : 0,
    };
  }

  obtenerAlertaPorId(id: string): AlertaDetalle | null {
    const alerta = this.alertasBase.find((item) => item.id === id);

    if (!alerta) {
      return null;
    }

    return {
      id: alerta.id,
      folio: alerta.folio,
      titulo: alerta.titulo,
      descripcion: alerta.descripcion,
      tipo:
        alerta.tipo === 'intrusion' || alerta.tipo === 'incendio'
          ? 'alarma'
          : alerta.tipo,
      prioridad: alerta.prioridad,
      estado:
      alerta.estado === 'activa'
          ? 'pendiente'
          : alerta.estado === 'atendida'
          ? 'resuelta'
          : 'en_proceso',
      latitud: alerta.latitud,
      longitud: alerta.longitud,
      direccion: alerta.ubicacion,
      ciudad: alerta.ciudad,
      fechaHoraReporte: alerta.hora,
      lineaReporte: 'Línea de Emergencia 911',
      unidadAsignada:
        alerta.estado === 'en_ruta' ? 'EN RUTA - UNIDAD 102' : 'UNIDAD ASIGNADA',
      autoridadReportante: {
        nombre: alerta.autoridad,
        identificador: '#SP-8821',
        division: 'División 4',
      },
      actualizaciones: [
        {
          id: `${alerta.id}-u1`,
          hora: alerta.hora,
          mensaje: `Seguimiento activo para: ${alerta.titulo}.`,
          tipo: 'info',
        },
      ],
    };
  }
}