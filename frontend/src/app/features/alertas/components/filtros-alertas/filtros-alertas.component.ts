import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FiltrosAlerta } from '../../interfaces/filtros-alerta.interface';

@Component({
  selector: 'app-filtros-alertas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtros-alertas.component.html',
  styleUrls: ['./filtros-alertas.component.scss'],
})
export class FiltrosAlertasComponent {
  private readonly fb = inject(FormBuilder);

  @Input() filtrosIniciales: FiltrosAlerta = {
    severidad: '',
    estado: '',
    tipoIncidente: '',
  };

  @Output() filtrosAplicados = new EventEmitter<FiltrosAlerta>();

  readonly formularioFiltros = this.fb.nonNullable.group({
    severidad: [''],
    estado: [''],
    tipoIncidente: [''],
  });

  ngOnInit(): void {
    this.formularioFiltros.patchValue(this.filtrosIniciales);
  }

  aplicarFiltros(): void {
    this.filtrosAplicados.emit(this.formularioFiltros.getRawValue());
  }

  limpiarFiltros(): void {
    this.formularioFiltros.reset({
      severidad: '',
      estado: '',
      tipoIncidente: '',
    });

    this.filtrosAplicados.emit(this.formularioFiltros.getRawValue());
  }
}