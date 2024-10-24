import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalticketdetallesPage } from './modalticketdetalles.page';

describe('ModalticketdetallesPage', () => {
  let component: ModalticketdetallesPage;
  let fixture: ComponentFixture<ModalticketdetallesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalticketdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
