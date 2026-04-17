import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoDetalleAlertaComponent } from './encabezado-detalle-alerta.component';

describe('EncabezadoDetalleAlertaComponent', () => {
  let component: EncabezadoDetalleAlertaComponent;
  let fixture: ComponentFixture<EncabezadoDetalleAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoDetalleAlertaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoDetalleAlertaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
