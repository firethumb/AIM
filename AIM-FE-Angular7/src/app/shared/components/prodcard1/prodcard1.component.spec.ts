import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Prodcard1Component } from './prodcard1.component';

describe('Prodcard1Component', () => {
  let component: Prodcard1Component;
  let fixture: ComponentFixture<Prodcard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Prodcard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Prodcard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
