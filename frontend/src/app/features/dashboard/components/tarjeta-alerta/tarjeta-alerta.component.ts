import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertaActiva } from '../../interfaces/alerta-activa.interface';

@Component({
  selector: 'app-tarjeta-alerta',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-alerta.component.html',
  styleUrls: ['./tarjeta-alerta.component.scss'],
})
export class TarjetaAlertaComponent {
  @Input({ required: true }) alerta!: AlertaActiva;

  @Output() seleccionar = new EventEmitter<AlertaActiva>();
  @Output() verDetalle = new EventEmitter<AlertaActiva>();

  obtenerClasesTarjeta(): string {
    if (this.alerta.prioridad === 'alta') {
      return 'border-red-500/30 bg-red-900/70';
    }

    return 'border-[#163258] bg-[#071a35]';
  }

  obtenerClasesTitulo(): string {
    return this.alerta.prioridad === 'alta' ? 'text-red-100' : 'text-slate-100';
  }

  obtenerEtiquetaPrioridad(): string {
    if (this.alerta.prioridad === 'alta') return 'High Priority';
    if (this.alerta.prioridad === 'media') return 'Medium Priority';
    return 'Normal Priority';
  }

  onSeleccionar(): void {
    this.seleccionar.emit(this.alerta);
  }

  onVerDetalle(event: Event): void {
    event.stopPropagation();
    this.verDetalle.emit(this.alerta);
  }
}