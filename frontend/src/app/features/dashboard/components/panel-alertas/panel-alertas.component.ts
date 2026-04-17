import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertaActiva } from '../../interfaces/alerta-activa.interface';
import { TarjetaAlertaComponent } from '../tarjeta-alerta/tarjeta-alerta.component';

interface FiltroAlerta {
  etiqueta: string;
  activo: boolean;
}

@Component({
  selector: 'app-panel-alertas',
  standalone: true,
  imports: [TarjetaAlertaComponent],
  templateUrl: './panel-alertas.component.html',
  styleUrls: ['./panel-alertas.component.scss'],
})
export class PanelAlertasComponent {
  @Input() alertas: AlertaActiva[] = [];

  @Output() alertaSeleccionada = new EventEmitter<AlertaActiva>();
  @Output() detalleSolicitado = new EventEmitter<AlertaActiva>();

  readonly filtros: FiltroAlerta[] = [
    { etiqueta: 'All', activo: true },
    { etiqueta: 'Robbery', activo: false },
    { etiqueta: 'Accident', activo: false },
    { etiqueta: 'Medical', activo: false },
  ];

  onAlertaSeleccionada(alerta: AlertaActiva): void {
    this.alertaSeleccionada.emit(alerta);
  }

  onDetalleSolicitado(alerta: AlertaActiva): void {
    this.detalleSolicitado.emit(alerta);
  }
}