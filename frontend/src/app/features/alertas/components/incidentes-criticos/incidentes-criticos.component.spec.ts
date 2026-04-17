import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentesCriticosComponent } from './incidentes-criticos.component';

describe('IncidentesCriticosComponent', () => {
  let component: IncidentesCriticosComponent;
  let fixture: ComponentFixture<IncidentesCriticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentesCriticosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentesCriticosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
