import { Component, Input } from '@angular/core';
import { ResumenAlertas } from '../../interfaces/resumen-alertas.interface';

@Component({
  selector: 'app-resumen-alertas',
  standalone: true,
  imports: [],
  templateUrl: './resumen-alertas.component.html',
  styleUrls: ['./resumen-alertas.component.scss'],
})
export class ResumenAlertasComponent {
  @Input({ required: true }) resumen!: ResumenAlertas;
}