import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpDropdownComponent } from './ump-dropdown.component';

describe('UmpDropdownComponent', () => {
  let component: UmpDropdownComponent;
  let fixture: ComponentFixture<UmpDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
