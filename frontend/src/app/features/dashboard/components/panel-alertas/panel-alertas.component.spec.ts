import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAlertasComponent } from './panel-alertas.component';

describe('PanelAlertasComponent', () => {
  let component: PanelAlertasComponent;
  let fixture: ComponentFixture<PanelAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAlertasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAlertasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
