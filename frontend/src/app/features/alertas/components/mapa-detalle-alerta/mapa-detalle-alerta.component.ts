import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { AlertaDetalle } from '../../interfaces/alerta-detalle.interface';

@Component({
  selector: 'app-mapa-detalle-alerta',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa-detalle-alerta.component.html',
  styleUrls: ['./mapa-detalle-alerta.component.scss'],
})
export class MapaDetalleAlertaComponent implements OnInit {
  @Input({ required: true }) alerta!: AlertaDetalle;

  opciones: L.MapOptions = {
    center: L.latLng(17.0803251, -96.7416772),
    zoom: 16,
    zoomControl: false,
  };

  capas: L.Layer[] = [];

  private mapa?: L.Map;

  ngOnInit(): void {
    const centroAlerta = L.latLng(this.alerta.latitud, this.alerta.longitud);

    this.opciones = {
      ...this.opciones,
      center: centroAlerta,
    };

    this.capas = [
      L.tileLayer(
        'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 20,
          attribution: '&copy; OpenStreetMap contributors &copy; Stadia Maps',
        }
      ),
      L.marker([this.alerta.latitud, this.alerta.longitud], {
        icon: this.crearIconoPunto(),
      }),
    ];
  }

  onMapReady(map: L.Map): void {
    this.mapa = map;

    setTimeout(() => map.invalidateSize(), 0);
    setTimeout(() => map.invalidateSize(), 300);
  }

  acercarMapa(): void {
    this.mapa?.zoomIn();
  }

  alejarMapa(): void {
    this.mapa?.zoomOut();
  }

  private crearIconoPunto(): L.DivIcon {
    return L.divIcon({
      className: 'contenedor-marcador-punto',
      html: `<span class="marcador-punto"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }
}