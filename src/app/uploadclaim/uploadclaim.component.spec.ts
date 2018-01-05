import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadclaimComponent } from './uploadclaim.component';

describe('UploadclaimComponent', () => {
  let component: UploadclaimComponent;
  let fixture: ComponentFixture<UploadclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
