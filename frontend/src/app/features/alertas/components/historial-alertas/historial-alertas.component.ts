import { Component, Input } from '@angular/core';
import { AlertaHistorial } from '../../interfaces/alerta-historial.interface';

@Component({
  selector: 'app-historial-alertas',
  standalone: true,
  imports: [],
  templateUrl: './historial-alertas.component.html',
  styleUrls: ['./historial-alertas.component.scss'],
})
export class HistorialAlertasComponent {
  @Input() historial: AlertaHistorial[] = [];

  formatearSeveridad(valor: string): string {
    if (valor === 'alta') return 'Alta';
    if (valor === 'media') return 'Media';
    if (valor === 'normal') return 'Normal';
    return valor;
  }

  formatearEstado(valor: string): string {
    if (valor === 'activa') return 'Activa';
    if (valor === 'en_ruta') return 'En ruta';
    if (valor === 'atendida') return 'Atendida';
    return valor;
  }

  formatearTipo(valor: string): string {
    if (valor === 'robo') return 'Robo';
    if (valor === 'accidente') return 'Accidente';
    if (valor === 'medica') return 'Médica';
    if (valor === 'alarma') return 'Alarma';
    if (valor === 'incendio') return 'Incendio';
    if (valor === 'intrusion') return 'Intrusión';
    return valor;
  }
}