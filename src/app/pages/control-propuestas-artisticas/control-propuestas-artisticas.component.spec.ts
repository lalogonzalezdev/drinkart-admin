/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlPropuestasArtisticasComponent } from './control-propuestas-artisticas.component';

describe('ControlPropuestasArtisticasComponent', () => {
  let component: ControlPropuestasArtisticasComponent;
  let fixture: ComponentFixture<ControlPropuestasArtisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPropuestasArtisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPropuestasArtisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
