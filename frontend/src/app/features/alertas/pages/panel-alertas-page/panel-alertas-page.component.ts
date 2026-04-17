import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from '../../services/alertas.service';
import { FiltrosAlertasComponent } from '../../components/filtros-alertas/filtros-alertas.component';
import { IncidentesCriticosComponent } from '../../components/incidentes-criticos/incidentes-criticos.component';
import { ResumenAlertasComponent } from '../../components/resumen-alertas/resumen-alertas.component';
import { HistorialAlertasComponent } from '../../components/historial-alertas/historial-alertas.component';
import { AlertaPanel } from '../../interfaces/alerta-panel.interface';
import { FiltrosAlerta } from '../../interfaces/filtros-alerta.interface';
import { AlertaHistorial } from '../../interfaces/alerta-historial.interface';
import { ResumenAlertas } from '../../interfaces/resumen-alertas.interface';

@Component({
  selector: 'app-panel-alertas-page',
  standalone: true,
  imports: [
    FiltrosAlertasComponent,
    IncidentesCriticosComponent,
    ResumenAlertasComponent,
    HistorialAlertasComponent,
  ],
  templateUrl: './panel-alertas-page.component.html',
  styleUrls: ['./panel-alertas-page.component.scss'],
})
export class PanelAlertasPageComponent {
  private readonly alertasService = inject(AlertasService);
  private readonly router = inject(Router);

  private readonly incidentesCriticosBase =
    this.alertasService.obtenerIncidentesCriticos();
  private readonly historialBase = this.alertasService.obtenerHistorialAlertas();

  readonly filtros = signal<FiltrosAlerta>({
    severidad: '',
    estado: '',
    tipoIncidente: '',
  });

  readonly incidentesCriticos = computed(() =>
    this.incidentesCriticosBase.filter((incidente) =>
      this.cumpleFiltrosIncidente(incidente, this.filtros())
    )
  );

  readonly historial = computed(() =>
    this.historialBase.filter((item) =>
      this.cumpleFiltrosHistorial(item, this.filtros())
    )
  );

  readonly resumen = computed<ResumenAlertas>(() => {
    const historialFiltrado = this.historial();
    const total = historialFiltrado.length;

    const totalAtendidas = historialFiltrado.filter(
      (item) => item.estado === 'atendida'
    ).length;

    const tasaResolucion =
      total > 0 ? Number(((totalAtendidas / total) * 100).toFixed(1)) : 0;

    let tiempoPromedioRespuesta = '4m 12s';

    if (total === 0) {
      tiempoPromedioRespuesta = '--';
    } else if (total <= 2) {
      tiempoPromedioRespuesta = '3m 48s';
    } else if (total <= 4) {
      tiempoPromedioRespuesta = '4m 12s';
    } else {
      tiempoPromedioRespuesta = '5m 03s';
    }

    return {
      totalAlertas24h: total,
      tiempoPromedioRespuesta,
      tasaResolucion,
    };
  });

  aplicarFiltros(filtros: FiltrosAlerta): void {
    this.filtros.set(filtros);
  }

  verDetalle(alerta: AlertaPanel): void {
    void this.router.navigate(['/dashboard/alertas', alerta.id]);
  }

  private cumpleFiltrosIncidente(
    incidente: AlertaPanel,
    filtros: FiltrosAlerta
  ): boolean {
    const cumpleSeveridad =
      !filtros.severidad || incidente.prioridad === filtros.severidad;

    const cumpleEstado = !filtros.estado || incidente.estado === filtros.estado;

    const cumpleTipo =
      !filtros.tipoIncidente || incidente.tipo === filtros.tipoIncidente;

    return cumpleSeveridad && cumpleEstado && cumpleTipo;
  }

  private cumpleFiltrosHistorial(
    item: AlertaHistorial,
    filtros: FiltrosAlerta
  ): boolean {
    const cumpleSeveridad =
      !filtros.severidad || item.severidad === filtros.severidad;

    const cumpleEstado = !filtros.estado || item.estado === filtros.estado;

    const cumpleTipo =
      !filtros.tipoIncidente || item.tipo === filtros.tipoIncidente;

    return cumpleSeveridad && cumpleEstado && cumpleTipo;
  }
}