import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from '../../services/alertas.service';
import { EncabezadoDetalleAlertaComponent } from '../../components/encabezado-detalle-alerta/encabezado-detalle-alerta.component';
import { PanelDetalleAlertaComponent } from '../../components/panel-detalle-alerta/panel-detalle-alerta.component';
import { MapaDetalleAlertaComponent } from '../../components/mapa-detalle-alerta/mapa-detalle-alerta.component';
import { AlertaDetalle } from '../../interfaces/alerta-detalle.interface';

@Component({
  selector: 'app-detalle-alerta',
  standalone: true,
  imports: [
    EncabezadoDetalleAlertaComponent,
    PanelDetalleAlertaComponent,
    MapaDetalleAlertaComponent,
  ],
  templateUrl: './detalle-alerta.component.html',
  styleUrls: ['./detalle-alerta.component.scss'],
})
export class DetalleAlertaComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly alertasService = inject(AlertasService);

  private readonly alertaSignal = signal<AlertaDetalle | null>(null);

  readonly alerta = computed(() => this.alertaSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.alertaSignal.set(this.alertasService.obtenerAlertaPorId(id));
    }
  }
}