import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAlertasComponent } from './resumen-alertas.component';

describe('ResumenAlertasComponent', () => {
  let component: ResumenAlertasComponent;
  let fixture: ComponentFixture<ResumenAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenAlertasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenAlertasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
