/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlVentasComponent } from './control-ventas.component';

describe('ControlVentasComponent', () => {
  let component: ControlVentasComponent;
  let fixture: ComponentFixture<ControlVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
