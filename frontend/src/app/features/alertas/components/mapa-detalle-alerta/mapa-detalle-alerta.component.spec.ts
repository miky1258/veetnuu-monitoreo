import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaDetalleAlertaComponent } from './mapa-detalle-alerta.component';

describe('MapaDetalleAlertaComponent', () => {
  let component: MapaDetalleAlertaComponent;
  let fixture: ComponentFixture<MapaDetalleAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaDetalleAlertaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaDetalleAlertaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
