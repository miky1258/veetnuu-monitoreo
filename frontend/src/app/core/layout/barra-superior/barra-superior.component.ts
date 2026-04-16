import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-barra-superior',
  standalone: true,
  imports: [],
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss'],
})
export class BarraSuperiorComponent {
  private readonly authService = inject(AuthService);

  readonly nombreSistema = "VE'ETNU'U";
  readonly estadoSistema = 'Online';
  readonly totalAlertasActivas = 14;

  readonly sesionActual = this.authService.sesionActual;

  readonly inicialesUsuario = computed(() => {
    const nombre = this.sesionActual()?.nombre ?? '';

    if (!nombre.trim()) {
      return '??';
    }

    return nombre
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase() ?? '')
      .join('');
  });
}