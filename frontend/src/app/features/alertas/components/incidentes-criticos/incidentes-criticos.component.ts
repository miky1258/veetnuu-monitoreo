import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TarjetaIncidenteCriticoComponent } from '../tarjeta-incidente-critico/tarjeta-incidente-critico.component';
import { AlertaPanel } from '../../interfaces/alerta-panel.interface';

@Component({
  selector: 'app-incidentes-criticos',
  standalone: true,
  imports: [TarjetaIncidenteCriticoComponent],
  templateUrl: './incidentes-criticos.component.html',
  styleUrls: ['./incidentes-criticos.component.scss'],
})
export class IncidentesCriticosComponent {
  @Input() incidentes: AlertaPanel[] = [];
  @Output() detalleSolicitado = new EventEmitter<AlertaPanel>();

  onDetalleSolicitado(incidente: AlertaPanel): void {
    this.detalleSolicitado.emit(incidente);
  }
}