import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAlertasComponent } from './components/panel-alertas/panel-alertas.component';
import { MapaMonitoreoComponent } from './components/mapa-monitoreo/mapa-monitoreo.component';
import { AlertaActiva } from './interfaces/alerta-activa.interface';
import { MarcadorMapa } from './interfaces/marcador-mapa.interface';
import { AlertasService } from '../alertas/services/alertas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PanelAlertasComponent, MapaMonitoreoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly alertasService = inject(AlertasService);

  readonly alertas: AlertaActiva[] = this.alertasService.obtenerAlertasDashboard();

  readonly alertaSeleccionada = signal<AlertaActiva | null>(null);

  readonly marcadores = computed<MarcadorMapa[]>(() =>
    this.alertas
      .filter((alerta) => alerta.latitud != null && alerta.longitud != null)
      .map((alerta) => ({
        id: alerta.id,
        titulo: alerta.titulo,
        latitud: alerta.latitud!,
        longitud: alerta.longitud!,
        tipo: alerta.tipo,
        descripcion: alerta.descripcion,
      }))
  );

  seleccionarAlerta(alerta: AlertaActiva): void {
    this.alertaSeleccionada.set({ ...alerta });
  }

  verDetalleAlerta(alerta: AlertaActiva): void {
    void this.router.navigate(['/dashboard/alertas', alerta.id]);
  }
}