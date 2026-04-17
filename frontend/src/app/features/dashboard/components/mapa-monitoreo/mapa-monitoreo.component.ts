import {
  AfterViewInit,
  Component,
  Input,
  NgZone,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { AlertaActiva } from '../../interfaces/alerta-activa.interface';
import { MarcadorMapa } from '../../interfaces/marcador-mapa.interface';

@Component({
  selector: 'app-mapa-monitoreo',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa-monitoreo.component.html',
  styleUrls: ['./mapa-monitoreo.component.scss'],
})
export class MapaMonitoreoComponent implements AfterViewInit, OnChanges {
  private readonly router = inject(Router);

  @Input() marcadores: MarcadorMapa[] = [];

  @Input()
  set alertaSeleccionada(valor: AlertaActiva | null) {
    this._alertaSeleccionada = valor;

    if (valor) {
      this.irAMarcadorDeAlerta(valor);
    }
  }

  get alertaSeleccionada(): AlertaActiva | null {
    return this._alertaSeleccionada;
  }

  opciones: L.MapOptions = {
    center: L.latLng(17.0803251, -96.7416772),
    zoom: 15,
    zoomControl: false,
  };

  capas: L.Layer[] = [];

  private mapa?: L.Map;
  private marcadoresLeaflet = new Map<string, L.Marker>();
  private _alertaSeleccionada: AlertaActiva | null = null;

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.actualizarCapas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['marcadores']) {
      this.actualizarCapas();

      if (this._alertaSeleccionada) {
        this.irAMarcadorDeAlerta(this._alertaSeleccionada);
      }
    }
  }

  onMapReady(map: L.Map): void {
    this.mapa = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    if (this._alertaSeleccionada) {
      this.irAMarcadorDeAlerta(this._alertaSeleccionada);
    }
  }

  acercarMapa(): void {
    this.mapa?.zoomIn();
  }

  alejarMapa(): void {
    this.mapa?.zoomOut();
  }

  private actualizarCapas(): void {
    const capaBase = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap contributors &copy; Stadia Maps',
      }
    );

    this.marcadoresLeaflet.clear();

    const capasMarcadores = this.marcadores.map((marcador) => {
      const marker = L.marker([marcador.latitud, marcador.longitud], {
        icon: this.crearIconoPunto(),
        interactive: true,
        title: marcador.titulo,
      });

      marker.bindPopup(this.crearContenidoPopup(marcador), {
        closeButton: false,
        autoClose: true,
        closeOnClick: true,
        className: 'popup-alerta-mapa',
        offset: L.point(0, -12),
      });

      marker.on('popupopen', (evento) => {
        const popupElement = evento.popup.getElement();

        if (!popupElement) {
          return;
        }

        const enlaceDetalle = popupElement.querySelector(
          `[data-detalle-id="${marcador.id}"]`
        );

        if (enlaceDetalle) {
          enlaceDetalle.addEventListener('click', (clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();

            this.ngZone.run(() => {
              void this.router.navigate(['/dashboard/alertas', marcador.id]);
            });
          });
        }
      });

      marker.on('click', () => {
        this.ngZone.run(() => {
          if (this.mapa) {
            this.mapa.flyTo([marcador.latitud, marcador.longitud], 16, {
              duration: 0.6,
            });
          }
        });
      });

      this.marcadoresLeaflet.set(marcador.id, marker);

      return marker;
    });

    this.capas = [capaBase, ...capasMarcadores];
  }

  private irAMarcadorDeAlerta(alerta: AlertaActiva): void {
    if (!this.mapa) {
      return;
    }

    const marcador = this.marcadoresLeaflet.get(alerta.id);

    if (!marcador) {
      return;
    }

    this.mapa.flyTo(marcador.getLatLng(), 16, {
      duration: 0.8,
    });

    setTimeout(() => {
      marcador.openPopup();
    }, 300);
  }

  private crearIconoPunto(): L.DivIcon {
    return L.divIcon({
      className: 'contenedor-marcador-punto',
      html: `<span class="marcador-punto"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -14],
    });
  }

  private crearContenidoPopup(marcador: MarcadorMapa): string {
    const titulo = this.escaparHtml(marcador.titulo);
    const descripcion = this.escaparHtml(marcador.descripcion ?? '');

    return `
      <div class="tarjeta-alerta-popup">
        <div class="tarjeta-alerta-popup__encabezado">
          <span class="tarjeta-alerta-popup__punto"></span>
          <span class="tarjeta-alerta-popup__etiqueta">ACTIVE INCIDENT</span>
        </div>
        <div class="tarjeta-alerta-popup__titulo">${titulo}</div>
        <div class="tarjeta-alerta-popup__subtitulo">${descripcion}</div>
        <button
          type="button"
          class="tarjeta-alerta-popup__detalle"
          data-detalle-id="${marcador.id}"
        >
          Ver detalles
        </button>
      </div>
    `;
  }

  private escaparHtml(valor: string): string {
    return valor
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}