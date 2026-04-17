import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertaDetalle } from '../../interfaces/alerta-detalle.interface';

@Component({
  selector: 'app-encabezado-detalle-alerta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './encabezado-detalle-alerta.component.html',
  styleUrls: ['./encabezado-detalle-alerta.component.scss'],
})
export class EncabezadoDetalleAlertaComponent {
  @Input({ required: true }) alerta!: AlertaDetalle;
}