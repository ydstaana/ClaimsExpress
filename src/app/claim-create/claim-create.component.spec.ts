import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCreateComponent } from './claim-create.component';

describe('ClaimCreateComponent', () => {
  let component: ClaimCreateComponent;
  let fixture: ComponentFixture<ClaimCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
