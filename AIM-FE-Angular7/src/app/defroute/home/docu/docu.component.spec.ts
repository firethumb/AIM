import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocuComponent } from './docu.component';

describe('DocuComponent', () => {
  let component: DocuComponent;
  let fixture: ComponentFixture<DocuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
