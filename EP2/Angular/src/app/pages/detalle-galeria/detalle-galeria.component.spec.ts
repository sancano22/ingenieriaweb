import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGaleriaComponent } from './detalle-galeria.component';

describe('DetalleGaleriaComponent', () => {
  let component: DetalleGaleriaComponent;
  let fixture: ComponentFixture<DetalleGaleriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleGaleriaComponent]
    });
    fixture = TestBed.createComponent(DetalleGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
