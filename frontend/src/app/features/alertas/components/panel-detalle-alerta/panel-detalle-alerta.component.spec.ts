import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDetalleAlertaComponent } from './panel-detalle-alerta.component';

describe('PanelDetalleAlertaComponent', () => {
  let component: PanelDetalleAlertaComponent;
  let fixture: ComponentFixture<PanelDetalleAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDetalleAlertaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelDetalleAlertaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
