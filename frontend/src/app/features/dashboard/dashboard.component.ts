import { Component, computed, signal } from '@angular/core';
import { PanelAlertasComponent } from './components/panel-alertas/panel-alertas.component';
import { MapaMonitoreoComponent } from './components/mapa-monitoreo/mapa-monitoreo.component';
import { AlertaActiva } from './interfaces/alerta-activa.interface';
import { MarcadorMapa } from './interfaces/marcador-mapa.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PanelAlertasComponent, MapaMonitoreoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  readonly alertas: AlertaActiva[] = [
    {
      id: 'a1',
      titulo: 'Pozoleee',
      descripcion: 'A la jaiba chacalosa la estan chacaleando :o',
      tiempo: '2M AGO',
      prioridad: 'alta',
      tipo: 'robo',
      latitud: 17.0803251,
      longitud: -96.7416772,
    },
  ];

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
}