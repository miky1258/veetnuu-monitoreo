import { Injectable, computed, signal } from '@angular/core';
import { CredencialesAcceso } from '../../features/auth/interfaces/credenciales-acceso.interface';
import { SesionUsuario } from '../../features/auth/interfaces/sesion-usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'veetnuu_sesion';

  private readonly credencialesMock = {
    identificacion: 'OP-000001',
    clave: 'Admin123*',
  };

  private readonly sesionMock: SesionUsuario = {
    id: 'usr-001',
    nombre: 'Operador Central',
    identificacion: 'OP-000001',
    rol: 'monitor',
    token: 'mock-token-veetnuu-001',
  };

  private readonly sesionActualSignal = signal<SesionUsuario | null>(
    this.obtenerSesionDesdeStorage()
  );

  readonly sesionActual = computed(() => this.sesionActualSignal());

  readonly autenticado = computed(() => this.sesionActualSignal() !== null);

  iniciarSesion(credenciales: CredencialesAcceso): {
    exito: boolean;
    mensaje: string;
  } {
    const identificacionNormalizada = credenciales.identificacion.trim();
    const claveNormalizada = credenciales.clave.trim();

    if (!identificacionNormalizada || !claveNormalizada) {
      return {
        exito: false,
        mensaje: 'Debes capturar la identificación y la clave de acceso.',
      };
    }

    const credencialesValidas =
      identificacionNormalizada === this.credencialesMock.identificacion &&
      claveNormalizada === this.credencialesMock.clave;

    if (!credencialesValidas) {
      return {
        exito: false,
        mensaje: 'Las credenciales ingresadas no son válidas.',
      };
    }

    this.sesionActualSignal.set(this.sesionMock);
    this.guardarSesionEnStorage(this.sesionMock);

    return {
      exito: true,
      mensaje: 'Inicio de sesión exitoso.',
    };
  }

  cerrarSesion(): void {
    this.sesionActualSignal.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  obtenerSesion(): SesionUsuario | null {
    return this.sesionActualSignal();
  }

  estaAutenticado(): boolean {
    return this.sesionActualSignal() !== null;
  }

  private guardarSesionEnStorage(sesion: SesionUsuario): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sesion));
  }

  private obtenerSesionDesdeStorage(): SesionUsuario | null {
    const sesionGuardada = localStorage.getItem(this.STORAGE_KEY);

    if (!sesionGuardada) {
      return null;
    }

    try {
      return JSON.parse(sesionGuardada) as SesionUsuario;
    } catch {
      localStorage.removeItem(this.STORAGE_KEY);
      return null;
    }
  }
}