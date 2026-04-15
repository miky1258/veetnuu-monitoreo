import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-incidencia-mapa',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-incidencia-mapa.component.html',
  styleUrls: ['./tarjeta-incidencia-mapa.component.scss'],
})
export class TarjetaIncidenciaMapaComponent {
  @Input() etiqueta = 'Active Incident';
  @Input() titulo = '';
  @Input() subtitulo = '';
}