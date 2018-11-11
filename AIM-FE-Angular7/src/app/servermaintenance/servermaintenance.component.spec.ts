import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServermaintenanceComponent } from './servermaintenance.component';

describe('ServermaintenanceComponent', () => {
  let component: ServermaintenanceComponent;
  let fixture: ComponentFixture<ServermaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServermaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServermaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
