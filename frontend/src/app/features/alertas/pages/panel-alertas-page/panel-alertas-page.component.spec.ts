import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAlertasPageComponent } from './panel-alertas-page.component';

describe('PanelAlertasPageComponent', () => {
  let component: PanelAlertasPageComponent;
  let fixture: ComponentFixture<PanelAlertasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAlertasPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAlertasPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
