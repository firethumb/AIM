import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefrouteComponent } from './defroute.component';

describe('DefrouteComponent', () => {
  let component: DefrouteComponent;
  let fixture: ComponentFixture<DefrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
