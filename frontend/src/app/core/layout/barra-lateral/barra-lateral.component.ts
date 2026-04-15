import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface ItemNavegacion {
  etiqueta: string;
  ruta: string;
  icono: 'inicio' | 'alertas' | 'estaciones' | 'reportes' | 'ajustes';
}

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss'],
})
export class BarraLateralComponent {
  readonly itemsNavegacion: ItemNavegacion[] = [
    { etiqueta: 'Inicio', ruta: '/dashboard', icono: 'inicio' },
    { etiqueta: 'Alertas', ruta: '/dashboard', icono: 'alertas' },
    { etiqueta: 'Estaciones', ruta: '/dashboard', icono: 'estaciones' },
    { etiqueta: 'Reportes', ruta: '/dashboard', icono: 'reportes' },
    { etiqueta: 'Ajustes', ruta: '/dashboard', icono: 'ajustes' },
  ];
}