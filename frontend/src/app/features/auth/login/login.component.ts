import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly enviando = signal(false);
  readonly mensajeError = signal('');
  readonly mostrarClave = signal(false);

  readonly formularioLogin = this.fb.nonNullable.group({
    identificacion: ['', [Validators.required, Validators.minLength(3)]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      this.mensajeError.set(
        'Debes capturar una identificación y una clave válidas.'
      );
      return;
    }

    this.enviando.set(true);
    this.mensajeError.set('');

    const resultado = this.authService.iniciarSesion(
      this.formularioLogin.getRawValue()
    );

    if (!resultado.exito) {
      this.enviando.set(false);
      this.mensajeError.set(resultado.mensaje);
      return;
    }

    this.enviando.set(false);
    void this.router.navigate(['/dashboard']);
  }

  alternarVisibilidadClave(): void {
    this.mostrarClave.update((valorActual) => !valorActual);
  }

  campoInvalido(nombreCampo: 'identificacion' | 'clave'): boolean {
    const campo = this.formularioLogin.controls[nombreCampo];
    return campo.invalid && (campo.touched || campo.dirty);
  }
}