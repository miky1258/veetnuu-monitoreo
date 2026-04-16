import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly itemsNavegacion: ItemNavegacion[] = [
    { etiqueta: 'Inicio', ruta: '/dashboard', icono: 'inicio' },
    { etiqueta: 'Alertas', ruta: '/dashboard', icono: 'alertas' },
    { etiqueta: 'Estaciones', ruta: '/dashboard', icono: 'estaciones' },
    { etiqueta: 'Reportes', ruta: '/dashboard', icono: 'reportes' },
    { etiqueta: 'Ajustes', ruta: '/dashboard', icono: 'ajustes' },
  ];

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    void this.router.navigate(['/login']);
  }
}