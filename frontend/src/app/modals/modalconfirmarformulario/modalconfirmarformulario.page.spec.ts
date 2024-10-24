import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalconfirmarformularioPage } from './modalconfirmarformulario.page';

describe('ModalconfirmarformularioPage', () => {
  let component: ModalconfirmarformularioPage;
  let fixture: ComponentFixture<ModalconfirmarformularioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalconfirmarformularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
