import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';

@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [RouterOutlet, BarraLateralComponent, BarraSuperiorComponent],
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.scss'],
})
export class LayoutPrincipalComponent {}