import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAlertasComponent } from './historial-alertas.component';

describe('HistorialAlertasComponent', () => {
  let component: HistorialAlertasComponent;
  let fixture: ComponentFixture<HistorialAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialAlertasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialAlertasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
