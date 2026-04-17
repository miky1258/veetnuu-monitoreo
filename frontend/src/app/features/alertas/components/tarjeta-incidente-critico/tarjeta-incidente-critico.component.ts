import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertaPanel } from '../../interfaces/alerta-panel.interface';

@Component({
  selector: 'app-tarjeta-incidente-critico',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-incidente-critico.component.html',
  styleUrls: ['./tarjeta-incidente-critico.component.scss'],
})
export class TarjetaIncidenteCriticoComponent {
  @Input({ required: true }) incidente!: AlertaPanel;
  @Output() verDetalle = new EventEmitter<AlertaPanel>();

  onVerDetalle(): void {
    this.verDetalle.emit(this.incidente);
  }
}