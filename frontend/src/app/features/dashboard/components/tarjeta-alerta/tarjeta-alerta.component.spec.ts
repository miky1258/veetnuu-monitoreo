import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaAlertaComponent } from './tarjeta-alerta.component';

describe('TarjetaAlertaComponent', () => {
  let component: TarjetaAlertaComponent;
  let fixture: ComponentFixture<TarjetaAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaAlertaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaAlertaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
