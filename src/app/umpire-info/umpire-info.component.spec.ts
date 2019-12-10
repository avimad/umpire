import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpireInfoComponent } from './umpire-info.component';

describe('UmpireInfoComponent', () => {
  let component: UmpireInfoComponent;
  let fixture: ComponentFixture<UmpireInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpireInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpireInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
