import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaIncidenteCriticoComponent } from './tarjeta-incidente-critico.component';

describe('TarjetaIncidenteCriticoComponent', () => {
  let component: TarjetaIncidenteCriticoComponent;
  let fixture: ComponentFixture<TarjetaIncidenteCriticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaIncidenteCriticoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaIncidenteCriticoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
