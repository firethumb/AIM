import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Prodcard2Component } from './prodcard2.component';

describe('Prodcard2Component', () => {
  let component: Prodcard2Component;
  let fixture: ComponentFixture<Prodcard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Prodcard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Prodcard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
