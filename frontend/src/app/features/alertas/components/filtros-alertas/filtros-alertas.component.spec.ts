import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosAlertasComponent } from './filtros-alertas.component';

describe('FiltrosAlertasComponent', () => {
  let component: FiltrosAlertasComponent;
  let fixture: ComponentFixture<FiltrosAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosAlertasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosAlertasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
