import { Component, Input } from '@angular/core';
import { AlertaDetalle } from '../../interfaces/alerta-detalle.interface';

@Component({
  selector: 'app-panel-detalle-alerta',
  standalone: true,
  imports: [],
  templateUrl: './panel-detalle-alerta.component.html',
  styleUrls: ['./panel-detalle-alerta.component.scss'],
})
export class PanelDetalleAlertaComponent {
  @Input({ required: true }) alerta!: AlertaDetalle;
}