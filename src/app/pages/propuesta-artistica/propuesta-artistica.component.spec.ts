/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PropuestaArtisticaComponent } from './propuesta-artistica.component';

describe('PropuestaArtisticaComponent', () => {
  let component: PropuestaArtisticaComponent;
  let fixture: ComponentFixture<PropuestaArtisticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropuestaArtisticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropuestaArtisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
